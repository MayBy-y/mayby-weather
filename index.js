localStorage.setItem('now', '101110101')
const able = new Date()
able.setDate(able.getDate() - 1)
console.log(able.getDate() - 1)
const able1 = able.toISOString().slice(0, 10).replace(/-/g, '')
console.log(able1)
const cityLike = document.querySelector('.city-attention')
document.querySelector('.areaName').addEventListener('mouseenter', (event) => {
    event.stopPropagation()
    event.preventDefault()
    document.querySelector('.city-attention').style.display = 'block'
})
document.querySelector('.areaName').addEventListener('mouseleave', (event) => {
    event.stopPropagation()
    event.preventDefault()
    document.querySelector('.city-attention').style.display = 'none'

})
cityLike.addEventListener('mouseenter', (event) => {
    event.stopPropagation()
    event.preventDefault()
    document.querySelector('.city-attention').style.display = 'block'
})
cityLike.addEventListener('mouseleave', (event) => {
    event.stopPropagation()
    event.preventDefault()
    document.querySelector('.city-attention').style.display = 'none'
})
//热门城市获取
document.querySelector('.search').addEventListener('focus', () => {
    document.querySelector('.city-list').style.display = 'block'
})
// document.querySelector('.search').addEventListener('blur', () => {
//     document.querySelector('.city-list').style.display = 'none'
//     console.log('qqq')
// })
document.addEventListener("DOMContentLoaded", everyDay)
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        fetchHistoricalWeather();
    }, 100);
});
everyDay()
hotCityget()
async function hotCityget() {
    console.log('Function hotCityget() is being called')
    try {
        console.log('Sending request...')
        const result = await axios({
            url: 'https://kk3aapbh78.re.qweatherapi.com/geo/v2/city/top',
            method: 'GET',
            params: {
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                number: 20,
                range: 'cn',
                lang: 'zh'
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        const cityList = result.data.topCityList || []
        console.log(cityList);

        document.querySelector('.hotList').innerHTML = cityList.map(item => {
            return `<li data-city-id="${item.id}" data-city-name="${item.name}"><span>${item.name}</span></li>`
        }).join('')
    } catch (error) {
        console.error('错误状态:', error.response.status)
    }
}
hotCityget()


document.querySelector('.airleve').addEventListener('mouseenter', () => {
    document.querySelector('.air-content').style.display = 'block'
})
document.querySelector('.airleve').addEventListener('mouseleave', () => {
    document.querySelector('.air-content').style.display = 'none'
})

//实时天气获取
// axios({
//     url: 'https://kk3aapbh78.re.qweatherapi.com/v7/weather/now',
//     method: 'GET',
//     params: {
//         key: '4e791dcacfae4c93a9f485d5f2fd3192',
//         location: '101110101',
//         lang: 'zh',
//         unit: 'm'
//     },
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     }
// }).then(result => {
//     // console.log(result)
//     const tmp = result.data
//     // console.log(tmp);

//     document.querySelector('.temperatrue').innerHTML = `${tmp.now.temp}°`
//     document.querySelector('.sun').innerHTML = tmp.now.text
//     document.querySelector('.city-other div:nth-child(1) span').innerHTML = `${tmp.now.windDir} ${tmp.now.windScale}级`
//     document.querySelector('.city-other div:nth-child(2) span').innerHTML = `湿度 ${tmp.now.humidity}%`
//     document.querySelector('.city-other div:nth-child(3) span').innerHTML = `气压 ${tmp.now.pressure}hPa`
//     const regex = /(?<=T)(.*?)(?=\+)/;
//     const match = tmp.now.obsTime.match(regex);
//     console.log(match[0]); // 输出 "14:32"
//     document.querySelector('.container p a').innerHTML = `中央气象台${match[0]}发布`
// }).catch(error => {
//     console.log(error);
//     console.error('错误数据:', error.response.data); // 查看错误的详细信息
//     console.error('错误状态:', error.response.status); // 查看错误的状态码
// })
//实时天气获取
async function getTimeWeather() {
    try {
        const cityId = localStorage.getItem('now')
        console.log(cityId);

        const result = await axios({
            url: 'https://kk3aapbh78.re.qweatherapi.com/v7/weather/now',
            method: 'GET',
            params: {
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                location: cityId,
                lang: 'zh',
                unit: 'm'
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const tmp = result.data
        console.log(tmp);

        document.querySelector('.temperatrue').innerHTML = `${tmp.now.temp}°`
        document.querySelector('.sun').innerHTML = tmp.now.text
        document.querySelector('.city-other div:nth-child(1) span').innerHTML = `${tmp.now.windDir} ${tmp.now.windScale}级`
        document.querySelector('.city-other div:nth-child(2) span').innerHTML = `湿度 ${tmp.now.humidity}%`
        document.querySelector('.city-other div:nth-child(3) span').innerHTML = `气压 ${tmp.now.pressure}hPa`
        const regex = /(?<=T)(.*?)(?=\+)/;
        const match = tmp.now.obsTime.match(regex);
        console.log(match[0]); // 输出 "14:32"
        document.querySelector('.container p a').innerHTML = `中央气象台${match[0]}发布`
    } catch (error) {
        console.log(error)
    }
}
getTimeWeather()
//逐小时获取
const hour = 25

//每小时天气获取
async function hourWeatherget() {
    try {
        const cityId = localStorage.getItem('now')
        const result = await axios({
            url: `https://kk3aapbh78.re.qweatherapi.com/v7/weather/24h`,
            method: 'GET',
            params: {
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                location: cityId,
                lang: 'zh',
                unit: 'm'
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const response = await axios({
            url: 'https://kk3aapbh78.re.qweatherapi.com/v7/weather/7d',
            method: 'GET',
            params: {
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                location: cityId,
                lang: 'zh',
                unit: 'm'
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        console.log(response.data.daily[0])
        function removeTimeColons(str) {
            return str.replace(/(\d):(\d)/g, "$1$2");
        }
        const sunrise1 = response.data.daily[1].sunrise
        const sundown = response.data.daily[0].sunset
        console.log(sundown);

        const hourData = result.data.hourly
        // console.log(hourData)
        const hourStr = hourData.map(item => {
            const regex = /(?<=T)(.*?)(?=\+)/;
            const match = item.fxTime.match(regex);
            return ` <li>
                    <p>${match[0]}</p>
                     <img src="./upload/d1.png" alt="">
                    <div>${item.temp}°</div>
                </li>`
        }).join('')
        // console.log(hourStr)
        document.querySelector('.weather-content ul').innerHTML = hourStr
        for (let i = 0; i < 23; i++) {
            const sun1 = document.querySelector(`.weather-content ul li:nth-child(${i + 1}) p`)
            const sun2 = document.querySelector(`.weather-content ul li:nth-child(${i + 2}) p`)
            // console.log(sun1.textContent)
            if (removeTimeColons(sunrise1) < removeTimeColons(sun2.textContent) && removeTimeColons(sunrise1) > removeTimeColons(sun1.textContent)) {
                const sunLI = document.createElement('li')
                sunLI.innerHTML = ` 
                    <p>${sunrise1}</p>
                    <img src="./upload/d2.png" alt="">
                    <div>日出</div>
            `
                console.log(sunLI);
                document.querySelector('.weather-content ul').insertBefore(sunLI, document.querySelector(`.weather-content ul li:nth-child(${i + 2})`))
            }
        }
        for (let i = 0; i < 24; i++) {
            const sun1 = document.querySelector(`.weather-content ul li:nth-child(${i + 1}) p`)
            const sun2 = document.querySelector(`.weather-content ul li:nth-child(${i + 2}) p`)
            // console.log(sun1.textContent)
            if (removeTimeColons(sundown) < removeTimeColons(sun2.textContent) && removeTimeColons(sundown) > removeTimeColons(sun1.textContent)) {
                const sunLI = document.createElement('li')
                sunLI.innerHTML = ` 
                    <p>${sundown}</p>
                    <img src="./upload/d3.png" alt="">
                    <div>日落</div>
            `
                console.log(sunLI);
                document.querySelector('.weather-content ul').insertBefore(sunLI, document.querySelector(`.weather-content ul li:nth-child(${i + 2})`))
            }
        }
    } catch (error) {
        console.log(error);

    }
}
hourWeatherget()
//每日天气左右按钮的滑动
const hourWeather = document.querySelector('.weather-content ul')
document.querySelector('.hour-row button:nth-child(2)').addEventListener('click', () => {
    // console.log(111)

    // console.log(hourWeather.offsetLeft);
    if (hourWeather.offsetLeft === 30) {
        document.querySelector('.weather-content ul').style.left = '-1070px'
    }
    console.log(hourWeather.offsetLeft);
    if (hourWeather.offsetLeft === -1070) {
        document.querySelector('.weather-content ul').style.left = '-1370px'
    }
    if (hourWeather.offsetLeft === 1370) {
        return
    }
    if (hourWeather.offsetLeft === -270) {
        document.querySelector('.weather-content ul').style.left = '-1370px'
    }

})
document.querySelector('.hour-row button:nth-child(1)').addEventListener('click', () => {
    console.log(111)
    if (hourWeather.offsetLeft === 30) {
        return
    }
    // console.log(hourWeather.offsetLeft)
    if (hourWeather.offsetLeft === -1070) {
        document.querySelector('.weather-content ul').style.left = '30px'
    }
    if (hourWeather.offsetLeft === -1370) {
        document.querySelector('.weather-content ul').style.left = '-270px'
    }
    console.log(hourWeather.offsetLeft);
    if (hourWeather.offsetLeft === -270) {
        document.querySelector('.weather-content ul').style.left = '30px'
    }

})
//7日天气预报
let maxTemperatures = []
let minTemperatures = []
// axios({
//     url: 'https://kk3aapbh78.re.qweatherapi.com/v7/weather/7d',
//     method: 'GET',
//     params: {
//         key: '4e791dcacfae4c93a9f485d5f2fd3192',
//         location: '101110101',
//         lang: 'zh',
//         unit: 'm'
//     },
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     }
// }).then(result => {
//     // console.log(result)
//     const weekWeather = result.data.daily
//     // console.log(weekWeather)
//     const weekWeatherStr = weekWeather.map((item, i) => {
//         // console.log(item.fxDate);
//         // console.log(item.fxDate);
//         let weekdays = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"];
//         const hourData = item.fxDate
//         let month = new Date(hourData).getMonth() + 1 < 10 ? '0' + (new Date(hourData).getMonth() + 1) : new Date(hourData).getMonth() + 1
//         let day = new Date(hourData).getDate() < 10 ? '0' + (new Date(hourData).getDate()) : new Date(hourData).getDate()
//         let day1 = weekdays[new Date(hourData).getUTCDay()]
//         if (i === 0) {
//             day1 = '今天'
//         }
//         if (i === 1) {
//             day1 = '明天'
//         }
//         if (i === 2) {
//             day1 = '后天'
//         }
//         maxTemperatures.push(+item.tempMax)
//         minTemperatures.push(+item.tempMin)
//         // console.log(month)
//         // console.log(day)
//         return `
//          <li>
//                 <p class="day">${day1}</p>
//                 <p class="data">${month}月${day}日</p>
//                 <p class="wt">${item.textNight}</p>
//                 <img src="./upload/d1.png" alt="">

//                 <div class="line"></div>

//                 <img src="./upload/d1.png" alt="">
//                 <p class="wt2">${item.textDay}</p>
//                 <div class="wind">${item.windDirDay}${item.windScaleNight}级</div>
//         </li>
//     `
//     }).join('')
//     // console.log(weekWeatherStr)
//     document.querySelector('.week-container ul').innerHTML = weekWeatherStr
// }).catch(error => {
//     console.log(error);

// })
async function everyDay() {
    try {
        const cityId = localStorage.getItem('now')
        const result = await axios({
            url: 'https://kk3aapbh78.re.qweatherapi.com/v7/weather/7d',
            method: 'GET',
            params: {
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                location: cityId,
                lang: 'zh',
                unit: 'm'
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        // console.log(result)
        const weekWeather = result.data.daily;
        const weekdays = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"];
        const weekWeatherStr = weekWeather.map((item, i) => {
            const hourData = item.fxDate;
            let month = new Date(hourData).getMonth() + 1;
            month = month < 10 ? '0' + month : month;

            let day = new Date(hourData).getDate();
            day = day < 10 ? '0' + day : day;

            let dayName = weekdays[new Date(hourData).getUTCDay()];
            if (i === 0) dayName = '今天';
            if (i === 1) dayName = '明天';
            if (i === 2) dayName = '后天';

            // 存储温度数据
            // maxTemperatures.push(+item.tempMax);
            // minTemperatures.push(+item.tempMin);

            return `
                <li>
                    <p class="day">${dayName}</p>
                    <p class="data">${month}月${day}日</p>
                    <p class="wt">${item.textNight}</p>
                    <img src="./upload/d1.png" alt="">
                    <div class="line"></div>
                    <img src="./upload/d1.png" alt="">
                    <p class="wt2">${item.textDay}</p>
                    <div class="wind">${item.windDirDay}${item.windScaleNight}级</div>
                </li>
            `;
        }).join('');

        // 4. 更新 DOM
        document.querySelector('.week-container ul').innerHTML = weekWeatherStr;
        // console.log(maxTemperatures);
        // return maxTemperatures
    } catch (error) {
        // 5. 错误处理
        console.error('获取天气数据失败:', error);
        // 可以在这里添加用户友好的错误提示
        document.querySelector('.week-container ul').innerHTML = '<li>天气数据加载失败，请稍后重试</li>';
    }
}
//昨日天气获取
async function fetchHistoricalWeather() {
    try {
        const cityId = localStorage.getItem('now')
        const result = await axios({
            url: 'https://kk3aapbh78.re.qweatherapi.com/v7/historical/weather',
            method: 'GET',
            params: {
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                location: cityId,
                date: able1,
                lang: 'zh',
                unit: 'm'
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const weatherData = result.data;
        console.log(weatherData);

        // 存储温度数据
        // maxTemperatures.unshift(+weatherData.weatherDaily.tempMax);
        // minTemperatures.unshift(+weatherData.weatherDaily.tempMin);

        // 3. 创建并插入新的列表项
        const li1 = document.createElement('li');
        li1.innerHTML = `
            <p class="day">昨天</p>
            <p class="data">${able.getMonth() + 1}月${able.getDate()}日</p>
            <p class="wt">${weatherData.weatherHourly[0].text}</p>
            <img src="./upload/d1.png" alt="">

            <div class="line"></div>

            <img src="./upload/d1.png" alt="">
            <p class="wt2">${weatherData.weatherHourly[19].text}</p>
            <div class="wind">微风1-3级</div>
        `;

        const lists = document.querySelector('.week-container ul')
        lists.insertBefore(li1, lists.firstChild);
        // console.log(minTemperatures);

    } catch (error) {
        // 4. 错误处理
        console.error('获取历史天气数据失败:', error)
    }
}
// fetchHistoricalWeather();
console.log(minTemperatures)
async function zhiShu() {
    try {
        const cityId = localStorage.getItem('now')
        const result = await axios({
            url: 'https://kk3aapbh78.re.qweatherapi.com/v7/indices/1d',
            method: 'GET',
            params: {
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                location: cityId,
                type: '1,2,3,4,5,8,9,16,15,10,6,14',
                lang: 'zh',
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        const zhishuStr = result.data.daily.map((item, i) => {
            const regex = /(\S+)\s*指数/
            const name = item.name.match(regex)
            // console.log(name[1]);
            // console.log(i)
            return `<div class="ct-sub">
                    <div class="zhishu" data-id = "${i}">
                        <div class="up">
                            <img src="./upload/e${i + 1}.png" alt="">
                            <p>${name[1]} ${item.category}</p>
                        </div>
                        <div class="buttom">
                            ${item.text}
                        </div>
                    </div>
                </div>`

        }).join('')
        document.querySelector('.ct-page').innerHTML = zhishuStr
        // console.log(document.querySelector('.ct-page').children[0]);
        for (let i = 0; i < 11; i++) {
            // console.log(document.querySelector('.ct-page').children[i].firstElementChild)
            const dailyZhi = document.querySelector('.ct-page').children[i].firstElementChild
            dailyZhi.addEventListener('mouseenter', () => {
                dailyZhi.style.transform = ' translateY(-135px)'
            })
            dailyZhi.addEventListener('mouseleave', () => {
                dailyZhi.style.transform = ' translateY(0px)'
            })
        }
    } catch (error) {
        console.log(error)
    }
}
zhiShu()
//生活指数的左右按钮滑动
const ctPage = document.querySelector('.ct-page')
document.querySelector('.daily-row button:last-child').addEventListener('click', () => {
    console.log(ctPage.offsetLeft)
    if (ctPage.offsetLeft === 0) {
        ctPage.style.left = '-455px'
    }
    if (ctPage.offsetLeft === -455) {
        return
    }

})
document.querySelector('.daily-row button:first-child').addEventListener('click', () => {
    console.log(ctPage.offsetLeft)
    if (ctPage.offsetLeft === 0) {
        return
    }
    if (ctPage.offsetLeft === -455) {
        ctPage.style.left = '0px'
    }
})

//气温折线图部分
// 确保DOM完全加载
zhexian()
async function zhexian() {
    console.log("DOM已加载，开始创建图表"); // 调试用
    let maxTemperatures = [30, 33, 34, 32, 33, 36, 35, 33]
    let minTemperatures = [25, 25, 25, 25, 25, 25, 24, 24]

    const ctx = document.getElementById('temperatureChart');
    if (!ctx) {
        console.error("未找到canvas元素");
        return;
    }
    // 示例数据
    try {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'DAY 8'], // 添加标签
                datasets: [
                    {
                        label: '最高气温',
                        data: maxTemperatures,
                        borderColor: '#fcc471',
                        backgroundColor: 'transparent',
                        tension: 0.3,
                        borderWidth: 3
                    },
                    {
                        label: '最低气温',
                        data: minTemperatures,
                        borderColor: '#93ccf9',
                        backgroundColor: 'transparent',
                        tension: 0.3,
                        borderWidth: 3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,

                layout: {
                    padding: {
                        top: 26,
                        right: 26,
                        bottom: 20,
                        left: 24
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                    decimation: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: false,
                        grid: { display: false }
                    },
                    y: {
                        display: false,
                        grid: { display: false },
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            },
            plugins: [{
                id: 'dataLabels',
                afterDatasetsDraw(chart) {
                    const { ctx, data, scales: { x, y } } = chart;

                    ctx.font = '18px Arial';
                    ctx.textAlign = 'center';

                    // 绘制最高气温标签
                    data.datasets[0].data.forEach((value, index) => {
                        if (index === 0) {
                            ctx.fillStyle = '#c0bfbf';
                        } else {
                            ctx.fillStyle = '#384c78';
                        }
                        ctx.fillText(
                            value + '°',
                            x.getPixelForValue(index) + 4,
                            y.getPixelForValue(value) - 15
                        );
                    });

                    // 绘制最低气温标签
                    data.datasets[1].data.forEach((value, index) => {
                        if (index === 0) {
                            ctx.fillStyle = '#c0bfbf';
                        } else {
                            ctx.fillStyle = '#384c78';
                        }
                        ctx.fillText(
                            value + '°',
                            x.getPixelForValue(index) + 4,
                            y.getPixelForValue(value) + 25
                        );
                    });
                }
            }]
        });
        console.log("图表创建成功");
    } catch (error) {
        console.error("创建图表时出错:", error);
    }
}


const searchInput = document.querySelector('.search')
const resultList = document.querySelector('.city-list')
let cancelToken;
searchInput.addEventListener('input', debounce(handleInput, 300))

function debounce(func, wait) {
    let timeout
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
async function handleInput(e) {
    const keyword = e.target.value.trim()
    if (cancelToken) {
        cancelToken.cancel('取消上一个请求')
    }
    cancelToken = axios.CancelToken.source()

    if (!keyword) {
        showDefaultContent()
        return
    }

    try {
        const response = await axios({
            url: 'https://kk3aapbh78.re.qweatherapi.com/geo/v2/city/lookup',
            params: {
                location: keyword,
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                range: 'cn',
                number: 20
            },
            cancelToken: cancelToken.token
        });
        showResult(response.data.location)
    } catch (error) {
        if (!axios.isCancel(error)) {
            resultList.innerHTML = '<li>抱歉未找到相关位置</li>'
        }
    }
}

function showDefaultContent() {
    resultList.classList.remove('city-scroll')
    resultList.innerHTML = `
        <h3>当前定位</h3>
        <p>西安市</p>
        <div class="history">
            <h3>历史记录
                <button>清除</button>
            </h3>
            <ul class="history-ct">
                <li><span>上海</span></li>
                <li><span>上海</span></li>
                <li><span>上海</span></li>
                <li><span>上海</span></li>
                <li><span>上海</span></li>
            </ul>
        </div>
        <div class="hot-ct">
            <h3>热门城市</h3>
            <ul class="hotList"></ul>
        </div>`
    hotCityget()
}

function showResult(cities) {
    if (!cities || cities.length === 0) {
        resultList.innerHTML = '<li>抱歉未找到相关位置</li>'
        return
    }

    const keyword = searchInput.value.trim()
    resultList.classList.add('city-scroll')

    resultList.innerHTML = cities.map(city =>
        `<li data-city-id="${city.id}" data-city-name="${city.name}">
            ${city.adm2 ? `<span class="city-region">${highlightMatch(city.adm2, keyword)}</span>` : ''}
            ${city.adm1 ? `<span class="city-region">${highlightMatch(city.adm1, keyword)}</span>` : ''}
            ${highlightMatch(city.name, keyword)}
        </li>`
    ).join('');
}
console.log(resultList)

resultList.addEventListener('click', function (e) {
    // console.log(e.target.tagName)
    if (e.target.tagName === 'LI') {
        const samllCity = e.target
        // console.log(samllCity.dataset)
        selectCity(e.target.dataset.cityId, e.target.dataset.cityName)
        historySearch()
    }
})
function highlightMatch(text, keyword) {
    if (!keyword) return text;
    const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    return text.replace(regex, match => `<span class="highlight">${match}</span>`);
}

function selectCity(id, name) {
    searchInput.value = ''
    showDefaultContent()
    resultList.style.display = 'none'
    historyCity(id, name)
    console.log('选择了城市:', name, id)
    getAdm()
    sclcetGuanzhu()
    getTimeWeather()
    hourWeatherget()
    everyDay()
    zhiShu()
}    //搜索历史
function historyCity(id, name) {
    const oldCity = localStorage.getItem('now')
    if (oldCity) {
        localStorage.removeItem('now')
        localStorage.setItem('now', id)
    }
    localStorage.setItem(name, 'historyCity')
    historySearch(name, id)
}
document.addEventListener("DOMContentLoaded", historySearch)

async function historySearch() {
    let historyCityStr = ''
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key)
        // console.log(value);


        if (value === 'historyCity') {
            console.log(key);
            historyCityStr += `<li data-city-id="${await attentionCityLocation(key)}" data-city-name="${key}"><span>${key}</span></li> `
        }

    }
    if (historyCityStr) {
        document.querySelector('.history .history-ct').innerHTML = historyCityStr
    }
}
//原来的搜索列表
document.querySelector('.city-list').addEventListener('click', e => {
    if (e.target.tagName === 'SPAN') {
        const father = e.target.parentElement
        console.log(father)
        selectCity(father.dataset.cityId, father.dataset.cityName)
        historySearch()
        getAdm()
        getTimeWeather()
        fetchHistoricalWeather()
    }
})
//删除按钮
document.querySelector('.history').addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        console.log('点击了');

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key)
            if (value === 'historyCity') {
                localStorage.removeItem(key)
            }
        }
        historySearch()
        document.querySelector('.history').style.display = 'none'
    }
})
//空气污染指数
// document.querySelector('.city-list').
async function pollotion() {
    try {
        const result = await axios({
            url: 'https://kk3aapbh78.re.qweatherapi.com/airquality/v1/current/34.34/108.93',
            params: {
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                lang: 'zh'
            }
        })
        console.log(result.data.indexes)
        const pollutants = result.data.pollutants
        const pollotionStr = pollutants.map((item) => {
            if (item.name !== 'CO') {
                item.concentration.value = Math.floor(item.concentration.value);
            }
            return `<div>
                <p>${item.concentration.value}</p>
                <p>${item.name}</p>
            </div>
            `
        }).join('')
        // console.log(pollotionStr);

        document.querySelector('.air-bd').innerHTML = pollotionStr
        document.querySelector('.air-head').style.backgroundColor = `rgba(${result.data.indexes[0].color.red}, ${result.data.indexes[0].color.green},${result.data.indexes[0].color.blue}, 1)`
        document.querySelector('.airleve').style.backgroundColor = `rgba(${result.data.indexes[0].color.red}, ${result.data.indexes[0].color.green},${result.data.indexes[0].color.blue}, 1)`
        document.querySelector('.sanjiao').style.borderBottomColor = `rgba(${result.data.indexes[0].color.red}, ${result.data.indexes[0].color.green},${result.data.indexes[0].color.blue}, 1)`
    }
    catch (error) {

    }
}
pollotion()

//修改显示地址
async function getAdm() {
    try {
        const nowLocation = localStorage.getItem('now')
        const result = await axios({
            url: 'https://kk3aapbh78.re.qweatherapi.com/geo/v2/city/lookup',
            params: {
                location: nowLocation,
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                range: 'cn',
                number: 20
            },
        })
        console.log(result.data.location[0])
        document.querySelector('.areaName span:nth-child(2)').innerHTML = result.data.location[0].adm1
        document.querySelector('.areaName span:nth-child(3)').innerHTML = result.data.location[0].adm2 + '市'

    } catch (error) {
        console.log(error)
    }

}
getAdm()
//获取城市id编码
async function attentionCityLocation(attentionName) {
    try {
        const result = await axios({
            url: 'https://kk3aapbh78.re.qweatherapi.com/geo/v2/city/lookup',
            params: {
                location: attentionName,
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                range: 'cn',
                number: 20
            },
        })
        console.log(result.data.location[0])
        return result.data.location[0].id
    } catch (error) {
        console.log(error)
    }
}


async function attentonWeather(key) {
    try {
        const cityIds = await attentionCityLocation(key)
        // console.log(cityIds);
        const result = await axios({
            url: 'https://kk3aapbh78.re.qweatherapi.com/v7/weather/3d',
            method: 'GET',
            params: {
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                location: cityIds,
                lang: 'zh',
                unit: 'm'
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        // console.log(result.data.daily[0])
        const temperturToday = `${result.data.daily[0].tempMax}° / ${result.data.daily[0].tempMin}°`
        // console.log(temperturToday)
        return temperturToday
    } catch (error) {
        // console.log(error.message);

    }
}
async function attentonWeatherLook(key) {
    try {
        const cityIds = await attentionCityLocation(key)
        // console.log(cityIds);
        const result = await axios({
            url: 'https://kk3aapbh78.re.qweatherapi.com/v7/weather/3d',
            method: 'GET',
            params: {
                key: '4e791dcacfae4c93a9f485d5f2fd3192',
                location: cityIds,
                lang: 'zh',
                unit: 'm'
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        // console.log(result.data.daily[0])

        return result.data.daily[0].textDay
    } catch (error) {
        // console.log(error.message);

    }
}
attentonWeather('西安市')
//关注模块
document.addEventListener("DOMContentLoaded", sclcetGuanzhu)
function sclcetGuanzhu() {
    if (localStorage.getItem(document.querySelector('.areaName span:nth-child(3)').textContent) === '1') {
        document.querySelector('.click-attention').textContent = '[已关注]'
        document.querySelector('.city-list').style.right = '19px'
    }
    else {
        document.querySelector('.click-attention').textContent = '[添加关注]'
        document.querySelector('.city-list').style.right = '6px'
    }
}
document.addEventListener('DOMContentLoaded', maxMin)
async function maxMin() {
    let attentiopnStr = ''
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        if (value === '1') {
            let attId = await attentonWeather(key)
            let weatherText = await attentonWeatherLook(key)
            attentiopnStr = attentiopnStr + `
           <li>
                            <div>${key}</div>
                            <button>设为默认</button>
                            <div>${weatherText}</div>
                            <div>${attId}</div>
                            <img src="./upload/h1.png" alt="" data-id = "${key}">
             </li>
           `
        }
        // console.log(attentiopnStr)
    }
    if (attentiopnStr) {
        document.querySelector('.city-attention ol').innerHTML = attentiopnStr
    }
}
const clickAttention = document.querySelector('.click-attention')
clickAttention.addEventListener('click', addAttention)
async function addAttention() {
    const cityNames = document.querySelector('.areaName span:nth-child(3)').textContent
    if (!localStorage.getItem(cityNames)) {
        clickAttention.textContent = '[已关注]'
        resultList.style.right = '19px'
        localStorage.setItem(cityNames, 1)
        const cityLi1 = document.querySelector('.city-attention ol li:first-child')
        const tems = await attentonWeather(cityNames)
        const weatherText = await attentonWeatherLook(cityNames)
        if (cityLi1.textContent === '点击“添加关注”添加城市哟~') {
            document.querySelector('.city-attention ol').innerHTML = `
             <li>
                            <div>${cityNames}</div>
                            <button>设为默认</button>
                            <div>${weatherText}</div>
                            <div>${tems}</div>
                            <img src="./upload/h1.png" alt="" data-id = "${cityNames}">
             </li>
            `
        } else {
            const nextLi = document.createElement('li')
            nextLi.innerHTML = `
            
                            <div>${cityNames}</div>
                            <button>设为默认</button>
                            <div>${weatherText}</div>
                            <div>${tems}</div>
                            <img src="./upload/h1.png" alt="" data-id = "${cityNames}">
            
            `
            document.querySelector('.city-attention ol').appendChild(nextLi)
        }
    }
}
//设置默认按钮
document.querySelector('.city-attention ol').addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;

        if (button.textContent.trim() === '设为默认') {
            button.textContent = '取消默认';
            // 可以在这里添加样式变化
            console.log('设置为默认状态');

        } else if (button.textContent.trim() === '取消默认') {
            button.textContent = '设为默认';
            console.log('取消默认状态');
        }
    }
});
// document.querySelector('.city-attention ol').addEventListener('click', e => {
//     if (e.target.tagName === 'BUTTON' && e.target.innerHTML === '取消默认') {
//         e.target.innerHTML = '设为默认'
//         console.log(e)
//     }
// })
// document.querySelector('.city-attention ol').addEventListener('mouseleave', e => {
//     if (e.target.tagName === 'BUTTON' && e.target.innerHTML === '取消默认') {
//         e.target.style.color = '#18a2deff'
//         e.target.style.borderColor = '#18a2deff'
//         e.target.innerHTML = '默认'
//     }
// }
// )
document.querySelector('.city-attention ol').addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
        console.log(e.target.dataset.id)
        localStorage.removeItem(e.target.dataset.id)
        maxMin()
        sclcetGuanzhu()
    }
})
