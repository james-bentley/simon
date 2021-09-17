const queue = [];
const validColors = ["green","red","yellow","blue"];
var color;
var check;

function buttonClick(id)
{
    color = id;
}

function empty(queue)
{
    return queue.length == 0;
}

function createGame(colorlist)
{
    while(!empty(queue))
    {
        queue.shift();
    }
    var colorArray = colorlist.split(" ");
    for(let i = 0; i < colorArray.length; i++)
    {
        queue.push(colorArray[i]);
    }
}

function getNextColor()
{
    return queue.shift();
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function doRound(round)
{
    var text = document.getElementById('output');
    for(let i = 1; i <= round; i++) //allows for input of color for each new round
    {
        await sleep(3500);
        text.innerText = round - i + " color(s) left!";
        check = getNextColor();
        var input = color;
        if(input != check)
        {
            return false;
        }
        else if (i == round)
        {
            return true;
        }
    }
} 

async function game()
{
    var text = document.getElementById('output');
    var winCount = 0;
    var color;

    for(let round = 1; round <= 5; round++)
    {
        text.innerText = "Round " + round;
        var colorlist = "";
        for(let i = 1; i <= round; i++) //chooses random colors
        {
            colorlist += validColors[((Math.random() * 4.0) | 0)] + " ";
        }
        createGame(colorlist);
        await sleep(2500);
        text.innerText = "Press the colors in order!\n\n" + queue;
        
        const wonRound = await doRound(round); //does individual round

        if(wonRound == true) //checks for win condition
        {
            text.innerText = "Yay!";
            winCount++;
        }
        else
        {
            text.innerText = "WRONG";
            await sleep(1000);
            break;
        }
    }

    if(winCount == 5) //checks for final win
    {
        text.innerText = "GAME WON!!! Congratulations!";
    }
    else
    {
        text.innerText = "GAME OVER";
    }
}
