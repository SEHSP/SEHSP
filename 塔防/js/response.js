//获取游戏介绍按钮
const descri = document.querySelector("#descri");
//获取游戏介绍
const introduce = document.querySelector("#introduce");
//获取游戏介绍的取消按钮
const Cancel = document.querySelector("#Cancel");
//获取开始按钮
const StartGame = document.querySelector("#StartGame");
//获取排行按钮
const listBu = document.querySelector("#listBu");
const list = document.querySelector("#list");
//获取提交按钮
const FormBut = document.querySelector("#Form button");
const Form = document.querySelector("#Form");

const gameover = document.querySelector("#gameover")

//当用户单击游戏介绍按钮时
descri.addEventListener("click", (e) => {
    bolld = !bolld
    bol()
});
//当用户点击取消按钮时
Cancel.addEventListener("click", (e) => {
    bolld = !bolld
    bol()
});

//当用户点击排行按钮时
let boolld = false
listBu.addEventListener("click", (e) => {
    bool()
})
function bool(){
    boolld = !boolld
    if (boolld) {
        listBu.classList.add("buttons");
        list.style.display = "flex";

    } else {
        listBu.classList.remove("buttons");
        list.style.display = "none";
    }
}

let bolld = true;
function bol() {
    if (bolld) {
        //介绍添加点击后的样式
        descri.classList.add("buttons");
        //让游戏介绍显现出来
        introduce.style.display = "flex";
        //开始按钮隐藏
        //StartGame.style.display = "none"
    } else {
        //删除介绍按钮点击的样式
        descri.classList.remove("buttons");
        //让游戏介绍隐藏
        introduce.style.display = "none";
        //开始按钮显现
        //StartGame.style.display = "flex";
    }
}

//当用户点击提交
FormBut.addEventListener("click", (e) => {
    addScore()
    
   
    
})

StartGame.addEventListener("click", (e) => {
    Gold = 50;
    beings = 1;
    font = 0;
    fot = 0;
    for (let i = enemyArr.length; i >= 0; i--) {
        enemyArr.splice(i, 1);
    }
    for (let i = defense.length; i >= 0; i--) {
        defense.splice(i, 1);
    }
    for (let i = placed.length-1; i >= 0; i--) {
        placed[i].boolean = true;
    }
    // placed = [];
    // defense = [];
    // enemyArr = [];
    //敌人的小帧号
    enemyi = 0;
    //敌人生成的速度
    enemies = 0;
    //敌人类型
    Types = 1;
    //敌人血量
    enemxue = 20;
    enem()
    animation()
    StartGame.style.display = "none";
    gameover.style.display = "none";
    if(boolld){
    bool()
    }
})

