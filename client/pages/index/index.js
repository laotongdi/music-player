// index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tab: 0,
        swiper_images: [{
                src: '/images/banner.jpg'
            },
            {
                src: '/images/banner.jpg'
            },
            {
                src: '/images/banner.jpg'
            }
        ],
        portals: [{
                src: '/images/04.png',
                text: '私人FM'
            },
            {
                src: '/images/05.png',
                text: '每日歌曲推荐'
            },
            {
                src: '/images/06.png',
                text: '云音乐新榜'
            }
        ],
        lists: [{
                src: '/images/cover.jpg',
                text: '紫罗兰'
            },
            {
                src: '/images/cover.jpg',
                text: '五月之歌'
            },
            {
                src: '/images/cover.jpg',
                text: '菩提树'
            },
            {
                src: '/images/cover.jpg',
                text: '欢乐颂'
            },
            {
                src: '/images/cover.jpg',
                text: '安魂曲'
            },
            {
                src: '/images/cover.jpg',
                text: '摇篮曲'
            }
        ],
        // 播放列表数据
        playlist: [{
                title: '老男孩',
                singer: '筷子兄弟',
                src: 'http://localhost:3000/1.mp3',
                coverImgUrl: '/images/kuai.jpg'
            },
            {
                title: '一生何求',
                singer: '陈百强',
                src: 'http://localhost:3000/2.mp3',
                coverImgUrl: '/images/chen.jpg'
            },
            {
                title: '朋友的酒 DJ',
                singer: 'DJ舞曲',
                src: 'http://localhost:3000/3.mp3',
                coverImgUrl: '/images/cover.jpg'
            }
        ],
        // 设置音乐状态
        state: 'paused',
        playIndex: 0,
        play: {
            currentTime: '00:00',
            duration: '00:00',
            percent: 0,
            title: '',
            singer: '',
            coverImgUrl: '/images/kuai.jpg'
        }
    },
    changeItem(e) {
        this.setData({
            tab: e.target.dataset.item
        })
    },
    // 轮播图切换事件  
    changeTab(e) {
        this.setData({
            tab: e.detail.current
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    audioCtx: null,
    onReady: function () {
        // 通过wx.createInnerAudioContext()创建音乐对象
        this.audioCtx = wx.createInnerAudioContext();
        this.setMusic(0)
        var that = this
        // 获取音乐地址
        // this.audioCtx.src = this.data.playlist[0].src;
        // this.audioCtx.play();
        // 在回调函数，this指向改变了
        this.audioCtx.onError(function(){
            console.log('播放失败' + that.audioCtx.src)
        })
        // 自动切换下一首
        this.audioCtx.onEnded(function() {
            that.next()
        })
        // 监听音乐播放
        this.audioCtx.onTimeUpdate(function(){
            // console.log(that.audioCtx.currentTime)
            that.setData({
                'play.currentTime':that.formatTime(that.audioCtx.currentTime),
                'play.duration':that.formatTime(that.audioCtx.duration),
                'play.percent':that.audioCtx.currentTime / that.audioCtx.duration * 100
            })
        })
        // 初始化播放
        this.audioCtx.onCanplay(function(){
            let time = setInterval(function(){
                if(that.audioCtx.duration!==0) {
                    clearInterval(time)
                }
            },500)
        })
    },
    // 滚动条
    sliderChange(e) {
        // console.log(e)
        var second = e.detail.value / 100 * this.audioCtx.duration
        this.audioCtx.seek(second)
        this.setData({
            'play.currentTime':this.formatTime(second)
        })
        // this.pause()
        // setTimeout(()=>{this.play()},80)
    },
    // 格式化时间
    formatTime(time) {
        var minute = Math.floor(time/60)%60
        var second = Math.floor(time)%60
        return (minute<10?'0'+minute:minute) + ':' + (second<10?'0'+second:second)
    },
    // 设置音乐播放的方法
    setMusic(index) {
        var music = this.data.playlist[index]
        this.audioCtx.src = music.src
        this.setData({
            playIndex: index,
            'play.title': music.title,
            'play.singer': music.singer,
            'play.coverImgUrl': music.coverImgUrl,
            'play.currentTime': music.currentTime,
            'play.duration': music.duration,
            'play.percent': 0
        })
    },
    // 音乐播放
    play() {
        this.audioCtx.play()
        this.setData({
            state: 'running'
        })
    },
    // 音乐暂停   
    pause() {
        this.audioCtx.pause()
        this.setData({
            state: 'paused'
        })
    },
    //   切换歌曲
    next() {
        var index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1;
        this.setMusic(index);
        if(this.data.state === 'running') {
        this.play()
        }
        // this.pause()
        // setTimeout(()=>{this.play()},80)
    },
    // 播放列表切换
    change(e) {
        console.log(e.currentTarget.dataset.index)
        this.setMusic(e.currentTarget.dataset.index)
        this.play()
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})