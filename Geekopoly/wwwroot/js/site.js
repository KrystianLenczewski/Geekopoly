//var dice = new Vue({
//    el: '#dice',
//    data: {
//        numbers: "0",
//        values: "5"
//    },
//    methods: {
//        sendToServer: function() {
//            this.numbers = Math.floor(Math.random() * 12) + 1;

//            axios({
//                method: 'post',
//                url: '/Boards/Game',
//                data: {
//                    "numbers": this.numbers
//                }

//                })
//                .then(function (response){
//                    console.log(response);
//                })
//                .catch(function (error){
//                    console.log(error);
//                });
//        }
//    }
//});


//var modal = new Vue({
//    el: '#modal',
//    data: {
//        decision: false
//    },
//    methods: {
//        modalAction() {
//            if (this.decision === false) {
//                this.decision = true;
//            }
//            else {
//                this.decision = false;
//            }
//        }
//    }
//});


//$("#reloader").click(function () {
//    $("#content").load(" #content");
//});