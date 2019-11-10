var dice = new Vue({
    el: '#dice',
    data: {
        numbers: "0"
    },
    methods: {
        sendToServer: function() {
            this.numbers = Math.floor(Math.random() * 12) + 1;

            axios({
                method: 'post',
                url: '/Boards/Game',
                data: {
                    "numbers": this.numbers
                }

                })
                .then(function (response){
                    console.log(response);
                })
                .catch(function (error){
                    console.log(error);
                });
        }
    }
});


$("#reloader").click(function () {
    $("#content").load(" #content");
});