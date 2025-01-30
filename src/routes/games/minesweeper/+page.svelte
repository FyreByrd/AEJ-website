<script lang="ts">
  import { CellState, GameState, backgroundMap, colorMap, imageMap } from './minesweeper';
  const cols = 8;
  const rows = 8;
  const freq = 0.15625;
  const area = rows * cols;
  let mCount = 0;
  let fCount = 0;
  let infoText = $state('Make a guess to begin');
  let buttonText = $state('');
  let data: (CellState | number)[] = $state(Array(64).fill(CellState.Empty));
  let hidden: (CellState | number)[] = $state(Array(64).fill(0));
  let gameState = $state(GameState.Blank);

  //handles click of coordinate
  function handleClick(col: number, row: number) {
    const index = row * rows + col;
    if (gameState === GameState.Blank) {
      populateBoard(index);
      while (mCount < 1) {
        clearBoard();
        populateBoard(index);
      }
      checkWin();
    } else {
      if (!clickable(index)) return;
      if (gameState === GameState.Probe) {
        if (hidden[index] === CellState.Mine) {
          gameState = GameState.Lost;
          infoText = 'You lost!';
          buttonText = 'Play again?';
          for (let i = 0; i < area; i++) {
            if (data[i] === CellState.Flag && hidden[i] === CellState.Mine)
              data[i] = CellState.Found;
            else data[i] = hidden[i];
          }
          return;
        } else {
          revealFromIndex(index);
        }
      } else if (gameState === GameState.Flag) {
        if (data[index] === CellState.Flag) {
          data[index] = CellState.Empty;
          fCount--;
        } else if (data[index] === CellState.Empty && mCount > fCount) {
          data[index] = CellState.Flag;
          fCount++;
        }
      }
      infoText = 'Mines left: ' + (mCount - fCount);
      checkWin();
    }
  }
  //generates a mine distribution and counts
  function populateBoard(startIndex: number) {
    //place mines
    fCount = 0;
    let m = 0;
    for (let i = 0; i < area && m < Math.floor(area * freq); i++) {
      data[i] = CellState.Empty;
      hidden[i] = 0;
      const r = Math.random();
      if (r < freq && i !== startIndex) {
        hidden[i] = CellState.Mine;
        m++;
      }
    }
    //update counts;
    for (let i = 0; i < area; i++) {
      if (hidden[i] === CellState.Mine) {
        const c = i % rows;
        const mask = [-(rows + 1), -rows, 1 - rows, -1, +1, rows - 1, rows, rows + 1];
        for (let j = 0; j < 8; j++) {
          const n = i + mask[j];
          if (Math.abs(c - (n % rows)) < 3 && n > -1 && n < area && typeof hidden[n] === 'number') {
            hidden[n] += 1;
          }
        }
      }
    }
    revealFromIndex(startIndex);
    gameState = GameState.Probe;
    mCount = m;
    infoText = 'Mines left: ' + mCount;
    buttonText = GameState.Probe;
  }
  //recursively reveals blank squares and neighbors
  function revealFromIndex(startIndex: number) {
    if (data[startIndex] === CellState.Empty || data[startIndex] === CellState.Flag) {
      if (data[startIndex] === CellState.Flag) {
        fCount--;
      }
      if (hidden[startIndex] !== CellState.Flag) {
        data[startIndex] = hidden[startIndex];
      }
      if (typeof data[startIndex] === 'number' && data[startIndex] > 0) {
        return;
      }
      const mask = [-1, -(rows - 1), -rows, -(rows + 1), +1, rows - 1, rows, rows + 1];
      const c = startIndex % rows;
      for (let i = 0; i < 8; i++) {
        const n = startIndex + mask[i];
        if (n > -1 && n < area && Math.abs(c - (n % rows)) < 3) {
          revealFromIndex(n);
          if (hidden[n] !== CellState.Mine) data[n] = hidden[n];
        }
      }
    }
  }
  //checks for win conditions
  function checkWin() {
    if (gameState === GameState.Lost) return;
    let cleared = true;
    let flagged = true;
    for (let i = 0; i < area; i++) {
      cleared = cleared && (data[i] !== CellState.Empty || hidden[i] === CellState.Mine);
      flagged = flagged && (hidden[i] !== CellState.Mine || data[i] === CellState.Flag);
    }
    if (cleared || flagged) {
      gameState = GameState.Won;
      infoText = 'You won!';
      buttonText = 'Play again?';
    }
  }
  //clears the board
  function clearBoard() {
    data = Array(64).fill(CellState.Empty);
    hidden = Array(64).fill(0);
    gameState = GameState.Blank;
    infoText = 'Make a guess to begin';
  }
  //returns true if box is clickable
  function clickable(index: number) {
    return !(data[index] !== CellState.Empty && data[index] !== CellState.Flag);
  }
</script>

<svelte:head>
  <title>Minesweeper &gt; Games | Aidan E. Jones</title>
</svelte:head>

<main class="container prose m-5 mx-auto">
  <h1>Minesweeper</h1>
  <table>
    <tbody>
      {#each Array(rows) as _, r}
        <tr>
          {#each Array(cols) as _, c}
            {@const cell = data[r * rows + c]}
            <td>
              <span class="content">
                <button
                  class="box btn"
                  class:no-animation={!clickable(r * rows + c)}
                  onclick={() => handleClick(c, r)}
                  style="background-color:{backgroundMap[cell]};"
                >
                  {#if typeof cell !== 'number' && cell !== CellState.Empty}
                    <img src={imageMap[cell].src} alt={imageMap[cell].alt} />
                  {:else if cell === 0 || cell === CellState.Empty}
                    <span style="color:{colorMap[cell]};"></span>
                  {:else}
                    <span style="color:{colorMap[cell]};">{cell}</span>
                  {/if}
                </button>
              </span>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  <p>
    <strong>{infoText}</strong>
    {#if gameState !== GameState.Blank}
      <button
        class="btn text-warning-content"
        class:bg-info={gameState === GameState.Probe}
        class:hover:bg-info={gameState === GameState.Probe}
        class:bg-warning={gameState === GameState.Flag}
        class:hover:bg-warning={gameState === GameState.Flag}
        class:bg-success={gameState === GameState.Won}
        class:hover:bg-success={gameState === GameState.Won}
        class:bg-error={gameState === GameState.Lost}
        class:hover:bg-error={gameState === GameState.Lost}
        onclick={() => {
          if (gameState === GameState.Probe) {
            gameState = GameState.Flag;
            buttonText = GameState.Flag;
          } else if (gameState === GameState.Flag) {
            gameState = GameState.Probe;
            buttonText = GameState.Probe;
          } else if (gameState === GameState.Lost || gameState === GameState.Won) {
            clearBoard();
            buttonText = 'Play again?';
          }
        }}
      >
        {buttonText}
      </button>
    {/if}
  </p>
</main>

<style>
  main {
    text-align: center;
  }
  table {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 0px;
    border-radius: 5px;
  }

  tr {
    width: 100%;
    margin: 0px;
    padding: 0px;
  }
  td {
    margin: 0px;
    padding: 0px;
    position: relative;
  }
  td:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
  td .content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .box {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    align-content: center;
    border-radius: 0;
  }
  img {
    position: relative;
    width: 90%;
    top: 0;
    left: 0;
  }
</style>
