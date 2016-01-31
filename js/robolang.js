var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night");
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight;
window.onresize = function() {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;
};
var player = {
    x: 0,
    y: 0,
    move: function(x, y) {
        this.x = x;
        this.y = y;
    },
    render: function() {
        ctx.fillRect(this.x, this.y, 25, 25);
    }
};
var MOVE_TIME = 250;
var ctx = canvas.getContext("2d");
function render() {
    canvas.width = canvas.width;
    for (var x = 0.5; x < canvas.width; x += 25) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    for (var y = 0.5; y < canvas.height; y += 25) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.strokeStyle = "#ddd";
    ctx.stroke();
    player.render();
}
function init() {
    var code = editor.getValue();
    var lines = code.split("\n");
    var i = 0;
    var iter = setInterval(function() {
        if (i < lines.length) {
            if (lines[i].indexOf("//") > -1) {
                lines[i] = "stay 0";
            }
            eval(parser.parse(lines[i]));
            i++;
        } else {
            clearInterval(iter);
        }
    }, MOVE_TIME);
}
function move(dir, count) {
    switch(dir) {
        case "UP":
            var i = 0;
            var iter = setInterval(function() {
                if (i < Number(count)) {
                    player.move(player.x, player.y - 25);
                    render();
                    i++;
                } else {
                    clearInterval(iter);
                }
            }, MOVE_TIME);
            break;
        case "DOWN":
            var i = 0;
            var iter = setInterval(function() {
                if (i < Number(count)) {
                    player.move(player.x, player.y + 25);
                    render();
                    i++;
                } else {
                    clearInterval(iter);
                }
            }, MOVE_TIME);
            break;
        case "LEFT":
            var i = 0;
            var iter = setInterval(function() {
                if (i < Number(count)) {
                    player.move(player.x - 25, player.y);
                    render();
                    i++;
                } else {
                    clearInterval(iter);
                }
            }, MOVE_TIME);
            break;
        case "RIGHT":
            var i = 0;
            var iter = setInterval(function() {
                if (i < Number(count)) {
                    player.move(player.x + 25, player.y);
                    render();
                    i++;
                } else {
                    clearInterval(iter);
                }
            }, MOVE_TIME);
            break;
    }
}
function stay(turns) {
    // TODO: Make this work.
}
render();
