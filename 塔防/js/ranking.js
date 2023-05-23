

let leaderboardData = [];
function addScore() {
    // 获取输入框中的名字和分数
    let input = document.querySelector("#Form input").value;
    let score = Gold;
    let foter = document.querySelector("#data .lispan1 span").innerText;

    // 数据校验
    if (input.trim() === "" || isNaN(score) || score < 0) {
        alert("请输入正确的姓名");
        return;
    }

    // 如果该姓名已有成绩则更新分数
    let idx = leaderboardData.findIndex(data => data.input === input);
    if (idx > -1) {
        leaderboardData[idx].score = score;
        leaderboardData[idx].foter = foter;
    } else {
        // 否则新添加一条记录
        leaderboardData.push({ input: input, score: score, foter: foter });
    }

    // 排序分数
    leaderboardData.sort((a, b, foter) => b.score - a.score - foter);

    // 更新表格html
    let html = `
                    <tr>
                        <td>1</td>
                        <td>苑</td>
                        <td>999</td>
                        <td>1s</td>
                    </tr>`;
    for (let i = 0; i < leaderboardData.length; i++) {
        html += `<tr><td>${i + 2}</td><td>${leaderboardData[i].input}</td><td>${leaderboardData[i].score}</td><td>${leaderboardData[i].foter}</td></tr>`;
    }
    document.getElementsByTagName("tbody")[0].innerHTML = html;
    Form.style.display = "none"
    boolld = !boolld
    listBu.classList.add("buttons");
    list.style.display = "flex";
}