<script>
    const assets = "/media/minesweeper";
    let cols = 8;
    let rows = 8;
    let freq = 0.15625;
    $: area = rows*cols;
    let mCount = 0;
    let fCount = 0;
    let infoText = "Make a guess to begin";
    let buttonText = "";
    let data = [
        "","","","","","","","",  "","","","","","","","",
        "","","","","","","","",  "","","","","","","","",
        "","","","","","","","",  "","","","","","","","",
        "","","","","","","","",  "","","","","","","",""];
    let hidden = [
        0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0];
    
    let state = "blank";
    let art = {
        "":{bg_color:"#dfdfdf"},
        0:{bg_color:"#ffffff"},
        1:{bg_color:"#dfffff",color:"#00aaaa"},
        2:{bg_color:"#dfffdf",color:"#00aa00"},
        3:{bg_color:"#ffdfdf",color:"#aa0000"},
        4:{bg_color:"#ffffdf",color:"#aaaa00"},
        5:{bg_color:"#dfdfff",color:"#0000aa"},
        6:{bg_color:"#ffdfff",color:"#aa00aa"},
        7:{bg_color:"#dfdfdf",color:"#555555"},
        8:{bg_color:"#dfdfdf",color:"#555555"},
        "mine":{src:assets+"/mine.png",alt:"a mine",bg_color:"#ff0000"},
        "flag":{src:assets+"/flag.png",alt:"a flag",bg_color:"#ffdfdf"}};
    
    //handles click of coordinate
    function handleClick(col, row){
        let index = row*rows + col;
        if(state === "blank"){
            populateBoard(index);
            while(mCount < 1)
            {
                clearBoard();
                populateBoard();
            }
            checkWin();
        }
        else {
            if(state === "probe") {
                if(hidden[index] === "mine") {
                    state = "lost";
                    infoText = "You lost!";
                    buttonText = "Play again?";
                    for(var i = 0; i < area; i++){
                        data[i] = hidden[i];
                    }
                    return;
                }else {
                    revealFromIndex(index);
                }
            } else if(state === "flag") {
                if(data[index] === "flag") {
                    data[index] = "";
                    fCount--;
                }else if(data[index] === "" && mCount > fCount) {
                    data[index] = "flag";
                    fCount++;
                }
                
            }
            infoText = "Mines left: "+(mCount-fCount);
            checkWin();
        }
    }
    //generates a mine distribution and counts
    function populateBoard(startIndex) {
        //place mines
        fCount = 0;
        let m = 0;
        for(var i = 0; i < area && m < Math.ceil(area*freq); i++){
            data[i] = "";
            hidden[i] = 0;
            var r = Math.random();
            if(r < freq && i !== startIndex) {
                hidden[i] = "mine";
                m++;
            }
        }
        //update counts;
        for(var i = 0; i < area; i++) {
            if(hidden[i] === "mine") {
                var c = i%rows;
                let mask = [-(rows+1),-rows,1-rows,-1,+1,rows-1,rows,rows+1];
                for(var j = 0; j < 8; j++) {
                    var n = i+mask[j];
                    if(Math.abs(c-(n%rows)) < 3 && n > -1 && n < area && hidden[n] !== "mine") {
                        hidden[n] += 1;
                    }
                }
            }
        }
        revealFromIndex(startIndex);
        state = "probe";
        mCount = m;
        infoText = "Mines left: "+mCount;
        buttonText = "probe";
    }
    //recursively reveals blank squares and neighbors
    function revealFromIndex(startIndex) {
        if(data[startIndex] === "" || data[startIndex] === "flag"){
            if(data[startIndex] === "flag") {fCount --;}
            if(hidden[startIndex] !== "mine")
            {
                data[startIndex] = hidden[startIndex];
            }
            if(data[startIndex] > 0)
            {
                return;
            }
            let mask = [-1, -(rows-1), -rows, -(rows+1), +1, rows-1, rows, rows+1];
            var c = startIndex % rows;
            for(var i = 0; i < 8; i++) {
                var n = startIndex + mask[i];
                if(n > -1 && n < area && Math.abs(c-(n%rows)) < 3) {
                    revealFromIndex(n);
                    if(hidden[n] !== "mine")
                        data[n] = hidden[n];
                }
            }
        }
    }
    //checks for win conditions
    function checkWin() {
        if(state === "lost") return;
        let cleared = true;
        let flagged = true;
        for(var i = 0; i < area; i++) {
            cleared = cleared && (data[i] !== "" || hidden[i] === "mine");
            flagged = flagged && (hidden[i] !== "mine" || data[i] === "flag");
        }
        if(cleared || flagged) {
            state = "won";
            infoText = "You won!";
            buttonText = "Play again?";
        }
    }
    //clears the board
    function clearBoard() {
        data = [
            "","","","","","","","",  "","","","","","","","",
            "","","","","","","","",  "","","","","","","","",
            "","","","","","","","",  "","","","","","","","",
            "","","","","","","","",  "","","","","","","",""];
        hidden = [
            0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0];
        state = "blank";
        infoText = "Make a guess to begin";
    }
</script>

<svelte:head>
    <title>Minesweeper &gt; Games | Aidan E. Jones</title>
</svelte:head>

<main class="prose container mx-auto m-5">
    <h1>Minesweeper</h1>
    <table>
        {#each Array(rows) as _, r}
        <tr>
            {#each Array(cols) as _, c}
            <td><span class="content">
                <button class="btn box " on:click={() => handleClick(c, r)}
                    style="background-color:{art[data[r*rows+c]]["bg_color"]};">
                    {#if data[r*rows+c] === "mine" || data[r*rows+c] === "flag"}
                        <img src={art[data[r*rows+c]]["src"]} alt={art[data[r*rows+c]]["alt"]}/>
                    {:else if data[r*rows+c] === 0 || data[r*rows+c] === ""}
                    <span style="color:{art[data[r*rows+c]]["color"]}"/>
                    {:else}
                        <span style="color:{art[data[r*rows+c]]["color"]}">{data[r*rows+c]}</span>
                    {/if}
                </button>
            </span></td>
            {/each}
        </tr>
        {/each}
    </table>
    <p>
        <strong>{infoText}</strong>
        {#if state !== "blank"}
            <button class="btn  
            {
                state === "probe" ? "bg-info hover:bg-info" : 
                state === "flag" ? "bg-warning hover:bg-warning" : 
                state === "won" ? "bg-success hover:bg-success" : 
                state === "lost" ? "bg-error hover:bg-error" : ""
            }" 
            on:click="{() => {
                if(state === "probe") { state = "flag"; buttonText = "flag"; }
                else if(state === "flag") { state = "probe"; buttonText = "probe";}
                else if(state === "lost" || state === "won") { clearBoard(); buttonText = "Play again?"; }
            }}">
                {buttonText}
            </button>
        {/if}
    </p>
</main>

<style>
    main{
        text-align:center;
    }
    table {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        padding: 0px;
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
        width:100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
        align-content: center;
    }
    img {
        position: relative;
        width: 90%;
        top: 0;
        left: 0;
    }
</style>