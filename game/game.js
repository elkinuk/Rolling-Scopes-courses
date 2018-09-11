const DEFAULT_COLOR = "#fff";
const HEAD_COLOR = "#f82220";
const CHILD_COLOR = "#f96e37";
const BALL_COLOR = "#39e2c4";
const HEAD_DEATH_COLOR = "#fff";
const G_COLOR = "#fcf13a";
const S_COLOR = "#c3fc3a";
const COLOR_1 = "#fc3a9e";
const T_COLOR = "#3a5afc";
const M_COLOR = "#fc5f3a";
const B_COLOR = "#8428d2";
const FONT_COLOR = "#000";
const S_EFFECT_COLOR_1 = "rgba(252, 120, 58, 0.7)";
const S_EFFECT_COLOR_2 = "#ec6319";
const G_EFFECT_COLOR_1 = "rgba(252, 219, 162, 0.6)";
const G_EFFECT_COLOR_2 = "rgba(252, 145, 58, 0)";

class Point {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        };
    }

    distanceTo(point) {
        let a = point.x - this.position.x;
        let b = point.y - this.position.y;
        return Math.sqrt(a * a + b * b);
    }

    getPosition() {
        return {
            x: this.position.x,
            y: this.position.y
        };
    }
}

let ElkinsWorld = new function() {
    let frames = 0;
    let lives = 3;
    let gravity_distance = 120;
    let pills_types = ["shield", "life", "gravitywarp", "timewarp", "sizewarp","bomb"];
    let gameScreen = {
        x: 0,
        y: 0,
        width: 1000,
        height: 600
    };
    let world;
    let game;
    let level_selector;
    let start_button;
    let reset_button = null;
    let last_results = {
        message: "",
        progress: 0,
        target: 0
    };
    let balls = [];
    let pills = [];
    let splash = [];
    let pill_points = [];
    let point_properties = null;
    let width_difference = window.innerWidth - gameScreen.width;
    let height_difference = window.innerHeight - gameScreen.height;
    let to_start = false;
    let score = 0;
    let start_time = 0;
    let tailTmp = 0;
    let tail = [];
    let cur_level = 1;
    let levels_prop = [{
            force_multiplier: 1.2, //скорость
            duration: 300, //продолжительность по времени
        }, {
            force_multiplier: 1.6,//+4
            duration: 400,
        }, {
            force_multiplier: 2.2,//+6
            duration: 500,
        }, {
            force_multiplier: 2.8,//+6
            duration: 600,
        }, {
            force_multiplier: 3.4,//+6
            duration: 700,
        }, {
            force_multiplier: 4.2,//+8
            duration: 800,
        }, {
            force_multiplier: 5,//+8
            duration: 1000,
        }, {
            force_multiplier: 5.8,//+8
            duration: 1300,
        }, {
            force_multiplier: 6.8,//+10
            duration: 2E3,
    }];
    let level_stat = {
        unlockedLevels: 1,
        selectedLevel: 1,
        mute: false
    };

    function click_start(event) {
        if (false == to_start){
            to_start = true;
            balls = [];
            pills = [];
            frames = tailTmp = score = 0;
            cur_level = level_stat.selectedLevel;
            point_properties.trail = [];
            point_properties.position.x = width_difference;
            point_properties.position.y = height_difference;
            point_properties.shield = 0;
            point_properties.gravity = 0;
            point_properties.flicker = 0;
            point_properties.lives = lives-1;
            point_properties.timewarped = false;
            point_properties.timefactor = 0;
            point_properties.sizewarped = false;
            point_properties.sizefactor = 0;
            point_properties.gravitywarped = false;
            point_properties.gravityfactor = 0;
            start_button.style.display = "none";
            game_status.style.display = "block";
            start_time = (new Date).getTime();
            level_selector.style.right = "9px";
            level_selector.style.top = "0px";
            world.style.cursor= "default";
        }
        event.preventDefault();
    }

    function death() {
        to_start = false;
        start_button.style.display = "block";
        world.style.cursor= "default";
        score = Math.round(score);

        let scoreText = "<span>Last results:</span>";
        scoreText += " Score <span>" + Math.round(score) + "</span>";
        scoreText += " Time <span>" + Math.round(100 * (((new Date).getTime() - start_time) / 1000)) / 100 + "s</span>";
        game_status.innerHTML = scoreText;
    }

    function reset_level_status() {
        let li = level_selector.getElementsByTagName("li");
        let status;

        for (let i = 0; i < li.length; i++) {
            status = i >= level_stat.unlockedLevels ? "locked" : "unlocked";
            if (i + 1 == level_stat.selectedLevel)
                status = "selected";
            li[i].setAttribute("class", status);
        }
    }

    function select_level(i) {
        if ("unlocked" == i.target.getAttribute("class")) {
            level_stat.selectedLevel = parseInt(i.target.getAttribute("data-level"));
            cur_level = level_stat.selectedLevel;
            reset_level_status();
        }
        i.preventDefault();
    }

    function mouse_move(client) {
        width_difference = client.clientX - 0.5 * (window.innerWidth - gameScreen.width) - 6;
        height_difference = client.clientY - 0.55 * (window.innerHeight - gameScreen.height) - 6;
    }

    function set_world_size() {
        world.width = gameScreen.width;
        world.height = gameScreen.height;
    }

    function make_splash(client, coeff, angle) {
        angle = angle || 1;
        for (angle = 10 * angle + Math.random() * 15 * angle; 0 <= --angle;) {
            let point = new Point;
            point.position.x = client.x + Math.sin(angle) * coeff;
            point.position.y = client.y + Math.cos(angle) * coeff;
            point.velocity = {
                x: -4 + 8 * Math.random(),
                y: -4 + 8 * Math.random()
            };
            point.alpha = 1;
            splash.push(point);
        }
    }

    function clean_track(x, y, width, height) {
        tail.push({
            x: x,
            y: y,
            width: width,
            height: height
        })
    }

    function clean_balls_track(x, y, len) {
        clean_track(x - len, y - len, 2 * len, 2 * len);
    }

    function update() {
        let obj;
        for (let i = tail.length; i--;)
            game.clearRect(Math.floor(tail[i].x), Math.floor(tail[i].y), Math.ceil(tail[i].width), Math.ceil(tail[i].height));

        tail = [];

        let variable = levels_prop[cur_level - 1].force_multiplier;

        if((cur_level < levels_prop.length) && to_start == true)
            variable += tailTmp / levels_prop[cur_level - 1].duration * (levels_prop[cur_level].force_multiplier - levels_prop[cur_level - 1].force_multiplier);

        let y_fall_coeff = 2 * variable * (1 - point_properties.timefactor);

        let flickerTmp = 1 == point_properties.flicker % 4 || 2 == point_properties.flicker % 4;

        if (to_start) {
            point_properties.position.x += (width_difference - point_properties.position.x) / 4;
            point_properties.position.y += (height_difference - point_properties.position.y) / 4;

            frames++;

            point_properties.flicker = Math.max(point_properties.flicker - 1, 0);
            point_properties.shield = Math.max(point_properties.shield - 1, 0);
            point_properties.gravity = Math.max(point_properties.gravity - 0.35, 0);

            if(point_properties.timewarped){
                if (0.5999 < point_properties.timefactor)
                    point_properties.timewarped = false;
                point_properties.timefactor += 0.1 * (0.6 - point_properties.timefactor);
            }
            else
                point_properties.timefactor += 0.002 * (0 - point_properties.timefactor);
            point_properties.timefactor = Math.max(Math.min(point_properties.timefactor, 1), 0);

            if(point_properties.sizewarped){
                if(0.5999 < point_properties.sizefactor)
                    point_properties.sizewarped = false;
                point_properties.sizefactor += 0.04 * (0.6 - point_properties.sizefactor);
            }
            else
                point_properties.sizefactor += 0.01 * (0 - point_properties.sizefactor);
            point_properties.sizefactor = Math.max(Math.min(point_properties.sizefactor, 1), 0);

            if(point_properties.gravitywarped){
                if(0.99995 < point_properties.gravityfactor)
                    point_properties.gravitywarped = false;
                point_properties.gravityfactor += 0.04 * (1 - point_properties.gravityfactor);
            }
            else {
                if(0.12 > point_properties.gravityfactor)
                    point_properties.gravityfactor = 0;
                point_properties.gravityfactor += 0.014 * (0 - point_properties.gravityfactor);
            }
            point_properties.gravityfactor = Math.max(Math.min(point_properties.gravityfactor, 1), 0);

            if (0 < point_properties.shield && (100 < point_properties.shield || 0 != point_properties.shield % 3)){
                let sizeTmp = point_properties.size * (Math.min(point_properties.shield, 100) / 50);

                game.beginPath();
                game.fillStyle = S_EFFECT_COLOR_1;
                game.strokeStyle = S_EFFECT_COLOR_2;
                game.arc(point_properties.position.x,point_properties.position.y, sizeTmp, 0, 2 * Math.PI, true);
                game.fill();
                game.stroke();

                clean_balls_track(point_properties.position.x, point_properties.position.y, sizeTmp + 2);
            }

            if(0 < point_properties.gravityfactor){
                let distance = point_properties.gravityfactor * gravity_distance;//радиус свечения

                let gradientTmp = game.createRadialGradient(point_properties.position.x, point_properties.position.y, 0, point_properties.position.x, point_properties.position.y, distance);
                gradientTmp.addColorStop(0.1, G_EFFECT_COLOR_1);
                gradientTmp.addColorStop(0.8, G_EFFECT_COLOR_2);

                game.beginPath();
                game.fillStyle = gradientTmp;
                game.arc(point_properties.position.x, point_properties.position.y, distance, 0, 2 * Math.PI, true);
                game.fill();

                clean_balls_track(point_properties.position.x, point_properties.position.y, distance);
            }

            for (; 60 > point_properties.trail.length - 1;)
                point_properties.trail.push(new Point(point_properties.position.x, point_properties.position.y));

            game.beginPath();
            game.stroke();
            game.closePath();

            let livesTmp = 0;
            for (let i = point_properties.trail.length - 1; 0 < i; i--) {
                obj = point_properties.trail[i];

                if (i == Math.round(51) || i == Math.round(45) || i == Math.round(39)){
                    game.beginPath();
                    game.lineWidth = 0.5;
                    game.fillStyle = flickerTmp ? HEAD_DEATH_COLOR : CHILD_COLOR;
                    game.arc(obj.position.x, obj.position.y, 4, 0, 2 * Math.PI, true);
                    game.fill();

                    clean_balls_track(obj.position.x, obj.position.y, 8);

                    livesTmp++;
                }

                if (livesTmp == point_properties.lives)
                    break;
            }

            if (60 < point_properties.trail.length)
                point_properties.trail.shift();

            game.beginPath();
            game.fillStyle = flickerTmp ? HEAD_DEATH_COLOR : HEAD_COLOR;
            game.arc(point_properties.position.x, point_properties.position.y, point_properties.size / 1.8, 0, 2 * Math.PI, true);
            game.fill();

            clean_balls_track(point_properties.position.x, point_properties.position.y, point_properties.size + 6);
        }

        if (to_start && (0 > point_properties.position.x || point_properties.position.x > gameScreen.width || 0 > point_properties.position.y || point_properties.position.y > gameScreen.height)){//выход за пределы
            make_splash(point_properties.position, 10);
            death();
        }

        for (let i = 0; i < balls.length; i++) {
            obj = balls[i];
            obj.size = obj.originalSize * (1 - point_properties.sizefactor);
            obj.offset.y *= 0.95;

            let distance = obj.distanceTo(point_properties.position);

            if (to_start) //гравитация,щит,смерть
                if (0 < point_properties.gravityfactor) {
                    let angle = Math.atan2(obj.position.y - point_properties.position.y, obj.position.x - point_properties.position.x);

                    let realDistance = point_properties.gravityfactor * gravity_distance;//дистанция обхода

                    if(distance < realDistance) {
                        obj.offset.x += 0.2 * (Math.cos(angle) * (realDistance - distance) - obj.offset.x);
                        obj.offset.y += 0.2 * (Math.sin(angle) * (realDistance - distance) - obj.offset.y);
                    }
                } else if (0 < point_properties.shield && distance < 0.5 * (4 * point_properties.size + obj.size)) {
                    make_splash(obj.position, 10);
                    balls.splice(i, 1);
                    i--;
                    score += 20;
                    push_pill_points(Math.ceil(20), obj.getPosition(), obj.force);
                    continue;
                } else if (distance < 0.5 * (point_properties.size + obj.size) && 0 == point_properties.flicker){
                    if (0 < point_properties.lives) {
                        make_splash(point_properties.position, 4);

                        point_properties.lives--;
                        point_properties.flicker += 60;

                        balls.splice(i, 1);
                        i--;
                    }
                    else {
                        make_splash(point_properties.position, 10);
                        death();
                    }
                }

            game.beginPath();
            game.fillStyle = BALL_COLOR;
            game.arc(obj.position.x + obj.offset.x, obj.position.y + obj.offset.y, obj.size / 2, 0, 2 * Math.PI, true);//форма поинта
            game.fill();

            clean_balls_track(obj.position.x + obj.offset.x, obj.position.y + obj.offset.y, obj.size);

            obj.position.y += y_fall_coeff * obj.force;

            if (obj.position.x < -obj.size || obj.position.y > gameScreen.height + obj.size){
                balls.splice(i, 1);
                i--;

                if(to_start)
                    tailTmp++;
            }
        }
        for (let i = 0; i < pills.length; i++) {
            obj = pills[i];

            if (obj.distanceTo(point_properties.position) < 0.5 * (point_properties.size + obj.size) && to_start) {
                if (obj.type == "shield")
                    point_properties.shield = 300;
                else
                    if(obj.type == "life"){
                        if(point_properties.lives < lives) {
                            push_pill_points("+1HP", obj.getPosition(), obj.force);
                            point_properties.lives = Math.min(point_properties.lives + 1, lives);
                        }
                    } else
                        if(obj.type == "gravitywarp")
                            point_properties.gravitywarped = true;
                        else
                            if (obj.type == "timewarp")
                                point_properties.timewarped = true;
                            else
                                if (obj.type == "sizewarp")
                                    point_properties.sizewarped = true;

                if(obj.type != "life") {
                    score += 50;
                    push_pill_points(Math.ceil(50), obj.getPosition(), obj.force);
                }

                for (let i = 0; i < balls.length; i++) {
                    e = balls[i];
                    if(obj.type == "bomb"){
                        if(1000 > e.distanceTo(obj.position)) { //в каком радиусе умирают шарики
                            make_splash(e.position, 10);
                            balls.splice(i, 1);
                            i--;
                            score += 5;
                            push_pill_points(Math.ceil(20), e.getPosition(), e.force);
                        }
                    } else if(100 > e.distanceTo(obj.position)) { //в каком радиусе умирают шарики
                        make_splash(e.position, 10);
                        balls.splice(i, 1);
                        i--;
                        score += 20;
                        push_pill_points(Math.ceil(20), e.getPosition(), e.force);
                    }
                }

                pills.splice(i, 1);
                i--;
            } else
                if (obj.position.x < -obj.size || obj.position.y > gameScreen.height + obj.size){
                    pills.splice(i, 1);
                    i--;
                }

            let title = "";
            let colorTmp = DEFAULT_COLOR;

            if(obj.type === "shield"){
                title = "S";
                colorTmp = S_COLOR;
            } else
                if (obj.type === "life"){
                    title = "1";
                    colorTmp = COLOR_1;
                } else
                    if(obj.type === "gravitywarp"){
                        title = "G";
                        colorTmp = G_COLOR;
                    } else
                        if (obj.type === "timewarp"){
                            title = "T";
                            colorTmp = T_COLOR;
                        } else
                            if(obj.type === "sizewarp"){
                                title = "M";
                                colorTmp = M_COLOR;
                            } else
                                if(obj.type === "bomb"){
                                    title = "B";
                                    colorTmp = B_COLOR;
                                }

            game.beginPath();
            game.fillStyle = colorTmp;
            game.arc(obj.position.x, obj.position.y, obj.size / 2, 0, 2 * Math.PI, true);
            game.fill();
            game.save();
            game.font = "bold 12px Arial";
            game.fillStyle = FONT_COLOR;
            game.fillText(title, obj.position.x - 0.5 * game.measureText(title).width, obj.position.y + 4);
            game.restore();

            clean_balls_track(obj.position.x, obj.position.y, obj.size);

            obj.position.y += y_fall_coeff * obj.force;
        }

        if(balls.length < 27 * variable)
            balls.push(points_coordinates(new Ball));

        if (1 > pills.length && 0.994 < Math.random() && false == point_properties.isBoosted()) {
            for (variable = new Pill; variable.type == "life" && point_properties.lives >= lives;)
                variable.randomizeType();
            pills.push(points_coordinates(variable))
        }

        for (let i = 0; i < splash.length; i++){
            obj = splash[i];
            obj.velocity.x += 0.04 * (levels_prop[cur_level - 1].force_multiplier - obj.velocity.x - 1);
            obj.velocity.y += 0.04 * (y_fall_coeff - obj.velocity.y);
            obj.position.x += obj.velocity.x;
            obj.position.y += obj.velocity.y;
            obj.alpha -= 0.02;

            game.fillStyle ="rgba(255,255,255," + Math.max(obj.alpha, 0) + ")";//цвет всплесков
            game.fillRect(obj.position.x, obj.position.y, 1, 1);

            clean_balls_track(obj.position.x, obj.position.y, 2);

            if (0 >= obj.alpha)
                splash.splice(i, 1);
        }
        for (let i = 0; i < pill_points.length; i++){
            obj = pill_points[i];

            obj.position.y = (obj.position.y + y_fall_coeff * obj.force) - 1;

            variable = game.measureText(obj.text).width;

            game.save();
            game.font = "10px Arial";
            game.fillStyle = "rgba( 255, 255, 255, " + obj.alpha + " )";//цвет очков когда съел конфетку
            game.fillText(obj.text, obj.position.x - 0.5 * variable, obj.position.y);
            game.restore();

            clean_track(obj.position.x - 0.5 * variable - 5, obj.position.y - 12, variable + 8, 22);//след от очков за таблетки

            obj.alpha *= 0.96;

            if(0.05 > obj.alpha){
                pill_points.splice(i, 1);
                i--;
            }
        }
        if (to_start) {
            if (variable = tailTmp > levels_prop[cur_level - 1].duration)
                if (cur_level < levels_prop.length){
                    score += 100 * cur_level;
                    cur_level++;
                    tailTmp = 0;
                    level_stat.unlockedLevels = Math.max(level_stat.unlockedLevels, cur_level);
                    level_stat.selectedLevel = cur_level;
                    reset_level_status();
                    variable = true;
                } else
                    variable = false;
            if(variable) {
                last_results.progress = 0;
                last_results.target = 1;
            }

            let scoreText = "<span>Last results:</span>";
            scoreText += " Score <span>" + Math.round(score) + "</span>";
            scoreText += " Lives <span>" + (point_properties.lives + 1) + "</span>";
            scoreText += " Time <span>" + Math.round(100 * (((new Date).getTime() - start_time) / 1000)) / 100 + "s</span>";
            game_status.innerHTML = scoreText;
        }

        requestAnimFrame(update);
    }

    function push_pill_points(text, point, force) {
        pill_points.push({
            text: text,
            position: {
                x: point.x,
                y: point.y
            },
            alpha: 1,
            force: force
        })
    }

    function points_coordinates(point) {
        if(0.3 < Math.random()){
            point.position.x = Math.random() * gameScreen.width;
            point.position.y = -10;
        }
        else {
            point.position.x = gameScreen.width + 110;
            point.position.y = 0.2 * -gameScreen.height + 1.2 * Math.random() * gameScreen.height;
        }
        return point;
    }

    function initial_values() {
        this.position = {
            x: 0,
            y: 0
        };
        this.trail = [];
        this.size = 12;
        this.shield = 0;
        this.lives = lives-1;
        this.flicker = 0;
        this.gravitywarped = false;
        this.gravityfactor = 0;
        this.timewarped = false;
        this.timefactor = 0;
        this.sizewarped = false;
        this.sizefactor = 0
    }

    function Ball() {
        this.position = {
            x: 0,
            y: 0
        };
        this.offset = {
            x: 0,
            y: 0
        };
        this.originalSize = this.size = 10 + 4 * Math.random();
        this.force = 1.5 + 0.1 * Math.random();//скорость поинтов!!!
    }

    function Pill() {
        this.type = null;
        this.position = {
            x: 0,
            y: 0
        };
        this.size = 30 + 4 * Math.random();
        this.force = 1 + 1 * Math.random();//скорость плюшек!!!
        this.randomizeType();
    }

    this.initialize = function() {
        world = document.getElementById("world");
        game_status = document.getElementById("game-status");
        level_selector = document.getElementById("level-selector");
        start_button = document.getElementById("start-button");

        if (world && world.getContext) {
            game = world.getContext("2d");
            document.addEventListener("mousemove", mouse_move, false);
            start_button.addEventListener("click", click_start, false);
            window.addEventListener("resize", set_world_size, false);

            let element = "";
            n = 1;

            for (let i = levels_prop.length; n <= i; n++)
                element += '<li data-level="' + n + '">' + n + "</li>";

            level_selector.getElementsByTagName("ul")[0].innerHTML = element;
            element = level_selector.getElementsByTagName("li");

            n = 0;
            for (let i = element.length; n < i; n++)
                element[n].addEventListener("click", select_level, false);

            reset_level_status();

            point_properties = new initial_values;
            set_world_size();

            update();

            world.style.display = "block";
            start_button.style.display = "block";
        }
    };

    initial_values.prototype = new Point;
    initial_values.prototype.isBoosted = function() {
        return 0 != this.shield || 0 != this.gravityfactor;
    };

    Ball.prototype = new Point;

    Pill.prototype = new Point;
    Pill.prototype.randomizeType = function() {
        this.type = pills_types[Math.round(Math.random() * (pills_types.length - 1))];
    }
};

window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(frames) {
        window.setTimeout(frames, 1000 / 60);
    }
}();

ElkinsWorld.initialize();
