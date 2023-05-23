const canvas = document.querySelector("canvas")
canvas.width = 1400;
canvas.height = 700;
const c = canvas.getContext("2d");

//金币
let Gold = 100;

const lispan2 = document.querySelector(".lispan2 span")
//命
let beings = 1;
const lispan3 = document.querySelector(".lispan3 span")

//帧号
let font = 0;
let fot = 0;

//获取地图数据添加到地图数组
roads.forEach(ro => {
    Maps[ro.col][ro.row] = 1
})
//创建放置
const placed = []

//创建显示塔防
const dragTam = [];
//塔防价格
const dragGold = [20, 30, 50]
//子弹颜色
const dragColor = ["orange", "blue", "red"];
//子弹射速
const dragSpeed = [4, 3, 3];
//子弹伤害
const dragPower = [2, 4, 10];

let counts = 0
//遍历地图数组
for (let i = 0; i < Maps.length; i++) {
    for (let j = 0; j < Maps[i].length; j++) {
        //将符合条件的绘制出来
        if (Maps[i][j] == 0) {
            placed.push(
                new Placed({
                    position: {
                        x: j * 70,
                        y: i * 70
                    }
                })
            )
        } else if (Maps[i][j] == 2) {

            dragTam.push(
                new Display({
                    position: {
                        x: j * 70,
                        y: i * 70
                    }, img: `img/arms${counts + 1}.png`,
                    range: 170 - counts * 10,
                    color: dragColor[counts],
                    speed: dragSpeed[counts],
                    power: dragPower[counts],
                    gold: dragGold[counts]

                })
            )

            counts++
        }
    }
}


//创建拖拽塔
const arms = [];

//创建塔防
const defense = [];
let defen = undefined;


//创建敌人
const enemyArr = [];
//敌人的小帧号
let enemyi = 0;
//敌人生成的速度
let enemies = 0;
//敌人类型
let Types = 1;
//敌人血量
let enemxue = 20;
//敌人距离 
let enemdistance = 500
function enem() {
    for (let i = 1; i <= 15; i++) {
        enemyArr.push(
            new Enemy({
                position: {
                    x: roads[0].row * 70 - (i * 100),
                    y: roads[0].col * 70
                }, img: `img/enemy${Types}.webp`,
                xue: enemxue,
                gold: Types * 20
            })
        )

        if (i == 5) {
            Types = 2
            enemxue = 40
            enemdistance = 600
        }
        if (i == 10) {
            Types = 3
            enemxue = 60
            enemdistance = 700
        }

        if (i >= 14) {
            console.log(1);
            Types = 5
            enemxue = 200
        }
        

    }
}



//动画函数
function animation() {
    lispan2.innerHTML = Gold
    lispan3.innerHTML = beings
    c.clearRect(0, 0, canvas.width, canvas.height)
    const anim = requestAnimationFrame(animation);
    //遍历地图数组
    for (let i = 0; i < Maps.length; i++) {
        for (let j = 0; j < Maps[i].length; j++) {
            //将符合条件的绘制出来
            if (Maps[i][j] == 1) {
                c.fillStyle = "#000"
                c.fillRect(j * 70, i * 70, 70, 70)
            } else if (Maps[i][j] == 2) {

            }
        }
    }


    //敌人
    for (let i = enemyArr.length - 1; i >= 0; i--) {
        const enmey = enemyArr[i];
        enmey.up();
        if (enmey.position.x > canvas.width) {
            enemyArr.splice(i, 1);
            beings--
        }
    }
    if (beings == 0) {
        lispan3.innerHTML = beings
        gameover.style.display = "flex";
        StartGame.style.top = 200 + "px"
        StartGame.style.display = "flex";
        document.querySelector("#StartGame button").innerHTML = "重新开始"
        cancelAnimationFrame(anim);
        return
    }
    if (enemyArr.length <= 0) {
        Form.style.display = "flex";
        StartGame.style.top = 200 + "px"
        StartGame.style.display = "flex";
        document.querySelector("#StartGame button").innerHTML = "再来一局"
        cancelAnimationFrame(anim);
    }



    //放置
    placed.forEach(placed => {
        placed.up(Muso)
    })





    //塔防
    defense.forEach(def => {
        def.up();
        def.enemyT = null
        const Found = enemyArr.filter(enemy => {
            const FX = enemy.position.x - def.position.x;
            const FY = enemy.position.y - def.position.y;
            const collide = Math.hypot(FX, FY)
            return collide < def.range + enemy.range
        })

        def.enemyT = Found[0];

        if (def.enemyT) {
            const deX = def.enemyT.centre.x - def.centre.x;
            const deY = def.enemyT.centre.y - def.centre.y;
            const angle = Math.atan2(deY, deX)
            def.angle = angle - 1.5
        }


        for (let i = 0; i < def.bulletArr.length; i++) {
            const bullet = def.bulletArr[i];
            bullet.up();
            const BEX = bullet.position.x - bullet.enemyB.centre.x;
            const BEY = bullet.position.y - bullet.enemyB.centre.y;
            const collide = Math.hypot(BEX, BEY)
            if (collide < bullet.range) {
                bullet.enemyB.xue -= bullet.power
                const lock = enemyArr.findIndex(enem => {
                    return enem === bullet.enemyB
                })
                if (lock > -1) {
                    if (bullet.enemyB.xue <= 0) {
                        enemyArr.splice(lock, 1);
                        Gold += bullet.enemyB.gold
                    }
                }
                def.bulletArr.splice(i, 1)
            }
        }
    })


    //要拖拽的塔
    dragTam.forEach(dragT => {
        dragT.draw()
    });
    //拖拽塔
    arms.forEach(ar => {
        ar.draw()
    });
    let num = fot / 165
    document.querySelector("#data .lispan1 span").innerHTML = num.toFixed(2)
    font++
    fot++
    //console.log(num);
}

//鼠标按下
let MouseStatus = false
canvas.addEventListener("mousedown", (e) => {
    //遍历要拖拽塔
    dragTam.forEach(dragT => {
        //判断鼠标是否在要拖拽塔的范围按下
        if (e.offsetX > dragT.position.x &&
            e.offsetX < dragT.position.x + 70 &&
            e.offsetY > dragT.position.y &&
            e.offsetY < dragT.position.y + 70
            && Gold >= dragT.gold) {
            //是的就记录鼠标已经按下
            MouseStatus = true;
            //向拖拽塔数组添加拖拽类
            arms.push(
                new Drag({
                    position: {
                        x: e.offsetX - 35,
                        y: e.offsetY - 35
                    }, range: dragT.range,//拖拽类的范围就是按下的要拖拽的范围
                    img: dragT.img.src,//拖拽类的图片就是按下的要拖拽的图片
                    color: dragT.color,
                    speed: dragT.speed,
                    power: dragT.power,
                    gold: dragT.gold
                })
            )
            //console.log(arms[0].color);
        }
    })
})
//鼠标移动
const Muso = {
    x: undefined,
    y: undefined
}
let state = undefined;
canvas.addEventListener("mousemove", (e) => {
    //记录鼠标的位置
    Muso.x = e.offsetX;
    Muso.y = e.offsetY;
    //判断鼠标是否按下
    if (MouseStatus) {
        arms.forEach(ar => {
            //让拖拽的元素值赋值给一个全局变量
            state = ar
            //将拖拽显示的元素的位置等于鼠标的位置
            ar.position.x = e.offsetX - 35;
            ar.position.y = e.offsetY - 35;
        })

        defen = null;
        //遍历放置塔
        for (let i = 0; i < placed.length; i++) {
            const pla = placed[i]
            //判断鼠标是否在可放置塔的位置
            if (e.offsetX > pla.position.x &&
                e.offsetX < pla.position.x + 70 &&
                e.offsetY > pla.position.y &&
                e.offsetY < pla.position.y + 70 &&
                pla.boolean) {
                //将进入判断放置的值赋值给一个变量
                defen = pla
                //拖拽的位置在可放置塔的范围就显示篮圈
                state.boolean = true
                break;

            } else {
                //拖拽的位置不在放置范围就显示红圈
                state.boolean = false
            }
        }

    }




})
//鼠标抬起
canvas.addEventListener("mouseup", (e) => {
    //判断鼠标是在拖拽塔防的位置按下
    if (MouseStatus) {
        if (state.boolean && defen && defen.boolean) {
            defen.boolean = false
            //鼠标在画布中抬起并在拖拽图片并在可放置的位置
            //向防御塔数组添加防御塔
            defense.push(
                new Defense({
                    position: {
                        x: defen.position.x,//防御塔的位置就是鼠标所在的可放置塔类的位置
                        y: defen.position.y
                    }, img: state.img.src,//防御塔的图片范围就是按下的要拖拽类的图片和范围
                    range: state.range,
                    color: state.color,
                    speed: state.speed,
                    power: state.power,
                    gold: state.gold / 2
                })
            )
            Gold -= state.gold

        }

        //松开后将值清除
        MouseStatus = false;
        //删除拖拽的那个图片
        arms.splice(0, 1)
    }
});

//点击事件
canvas.addEventListener("click", (e) => {

    defense.forEach((def, i) => {
        //判断点击的位置是否是塔防所在的位置
        if (
            e.offsetX > def.position.x &&
            e.offsetX < def.position.x + 70 &&
            e.offsetY > def.position.y &&
            e.offsetY < def.position.y + 70

        ) {
            //判断鼠标是否点击到删除和防御塔是否被点击显示范围
            if (e.offsetX > def.delete.x - 10 &&
                e.offsetX < def.delete.x + 10 &&
                e.offsetY > def.delete.y - 10 &&
                e.offsetY < def.delete.y + 10 &&
                def.boolean) {
                //遍历放置
                placed.forEach((placed) => {
                    //判断鼠标是否在放置里面
                    if (
                        e.offsetX > placed.position.x &&
                        e.offsetX < placed.position.x + 70 &&
                        e.offsetY > placed.position.y &&
                        e.offsetY < placed.position.y + 70
                    ) {
                        //将放置设置成可放置
                        placed.boolean = true
                        //将防御塔删除
                        defense.splice(i, 1);
                        Gold += def.gold
                        lispan2.innerHTML = Gold
                    }
                })


            }

            //点击进入判断的防御塔就将塔防的布尔值反转
            def.boolean = !def.boolean;//实现范围的开启和关闭

        }

    })
})
