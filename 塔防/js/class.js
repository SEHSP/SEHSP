//敌人类
class Enemy {
    constructor({ position = { x: 0, y: 0 }, img, xue,gold}) {
        this.position = position;
        this.size = 70
        this.range = 40;
        this.img = new Image;
        this.img.src = img;
        this.xue = xue;
        this.gold = gold;
        this.speed = 0.5;
        this.index = 0;
        this.centre = {
            x: this.position.x + this.size / 2,
            y: this.position.y + this.size / 2
        }
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y - 20, this.xue, 10)
        c.drawImage(this.img, this.position.x, this.position.y, this.size, this.size);
    }

    up() {
        this.draw()
        const route = roads[this.index];
        const routeX = route.row * 70 - this.position.x;
        const routeY = route.col * 70 - this.position.y;
        const angle = Math.atan2(routeY, routeX);
        this.position.x += Math.cos(angle);
        this.position.y += Math.sin(angle);
        this.centre = {
            x: this.position.x + this.size / 2,
            y: this.position.y + this.size / 2
        }
        if (Math.round(this.position.x) === route.row * 70 &&
            Math.round(this.position.y) === route.col * 70 &&
            this.index < roads.length - 1) {
            this.index++
        }
    }
}


//拖拽显示图片和范围类
class Drag {
    constructor({ position = { x: 0, y: 0 }, img, range, color, power, speed,gold}) {
        this.position = position;
        this.size = 70
        this.range = range;
        this.img = new Image;
        this.img.src = img;
        this.boolean = true;
        this.color = color;
        this.power = power;
        this.speed = speed;
        this.gold = gold;
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x + 35, this.position.y + 35, this.range, 0, Math.PI * 2);
        if (this.boolean) {
            c.fillStyle = "rgba(36, 182, 255, 0.5)";
        } else {
            c.fillStyle = "rgba(255, 0, 0, 0.5)";
        }

        c.fill()
        c.closePath()
        c.drawImage(this.img, this.position.x, this.position.y, this.size, this.size);
    }
    up() {

    }
}

//显示图片
class Display {
    constructor({ position = { x: 0, y: 0 }, img, range, color, power, speed ,gold}) {
        this.position = position;
        this.range = range;
        this.img = new Image;
        this.img.src = img;
        this.color = color;
        this.power = power;
        this.speed = speed;
        this.gold = gold;
    }

    draw() {
        c.drawImage(this.img, this.position.x, this.position.y, 70, 70)
    }
};

//放置
class Placed {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position;
        this.size = 70;
        this.boolean = true;
    };
    draw() {
        c.fillStyle = "rgba(0,255,255,0.8)";
        c.fillRect(this.position.x, this.position.y, this.size, this.size);
    }

    up(mosu) {
        if (
            mosu.x > this.position.x &&
            mosu.x < this.position.x + this.size &&
            mosu.y > this.position.y &&
            mosu.y < this.position.y + this.size
        ) {
            this.draw();
        }
    }
}


//塔防
class Defense {
    constructor({ position = { x: 0, y: 0 }, img, range, color, power, speed ,gold}) {
        this.position = position;
        this.size = 70;
        this.range = range;
        this.font = 0
        this.img = new Image;
        this.img.src = img;
        this.color = color;
        this.power = power;
        this.speed = speed;
        this.gold = gold
        this.centre = {
            x: this.position.x + this.size / 2,
            y: this.position.y + this.size / 2
        }

        this.boolean = true;

        //获取塔防的右下角
        this.delete = {
            x: this.centre.x + 40 / 2,
            y: this.centre.y + 40 / 2
        }

        //存储子弹的数组
        this.bulletArr = []

        //获取进入范围的敌人
        this.enemyT;
        this.angle = 0
    }

    draw() {
        if (this.boolean) {
            c.beginPath()
            c.arc(this.centre.x, this.centre.y, this.range, 0, Math.PI * 2);
            c.fillStyle = "rgba(36, 182, 255, 0.5)";
            c.fill()



            // c.fillStyle = "red"
            // c.fillRect(this.delete.x, this.delete.y, 20, 20);
        }

        c.save();
        c.translate(this.centre.x, this.centre.y);
        c.rotate(this.angle);
        c.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);
        c.restore();

        //绘制删除样式
        if (this.boolean) {
            //开始绘制
            c.beginPath()
            //绘制路径的颜色
            c.strokeStyle = "red";
            //绘制线条的粗细
            c.lineWidth = 4
            //绘制线条的起始点1
            c.moveTo(this.delete.x, this.delete.y);
            //绘制线条的结束点1
            c.lineTo(this.delete.x + 10, this.delete.y + 10);
            //绘制线条的起始点2
            c.moveTo(this.delete.x + 10, this.delete.y);
            //绘制线条的结束点2
            c.lineTo(this.delete.x, this.delete.y + 10);
            //填充路径
            c.stroke();
        }

    }

    up() {
        this.draw()
        if (this.font % 50 == 0 && this.enemyT) {
            this.bulletArr.push(
                new Bullet({
                    position: {
                        x: this.centre.x,
                        y: this.centre.y
                    }, color: this.color,
                    speed: this.speed,
                    power: this.power,
                    enemyB: this.enemyT
                })
            )
        }

        this.font++
    }
}

//子弹类
class Bullet {
    //位置，颜色，速度，威力
    constructor({ position = { x: 0, y: 0 }, color, speed, power, enemyB }) {
        this.position = position;
        this.color = color;
        this.speed = speed;
        this.power = power;
        this.range = 10;
        this.enemyB = enemyB
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.range, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }

    up() {
        this.draw()

        const BX = this.enemyB.centre.x - this.position.x
        const BY = this.enemyB.centre.y - this.position.y
        const angle = Math.atan2(BY, BX);
        this.position.x += Math.cos(angle)*this.speed;
        this.position.y += Math.sin(angle)*this.speed;

    }

}

