class Dice {
    constructor(dice_x, dice_y, dice_width, dice_height) {

        this.dice_x = dice_x;
        this.dice_y = dice_y;
        this.dice_width = dice_width;
        this.dice_height = dice_height;

    }

    show_dice() {
        fill(0);
        rect(this.dice_x, this.dice_y, this.dice_width, this.dice_height);
    }

    dice_pressed() {
        if (mouseX > this.dice_x && mouseX < this.dice_x + this.dice_width && mouseY > this.dice_y && mouseY && mouseY < this.dice_y + this.dice_height) {
            dice_clicked = true;
        }
    }

    dice_roll() {
        let generated_numbers = this.numbers = Math.floor(Math.random() * 12) + 1;
        let data = { numbers: generated_numbers, decision_value: 999 };

        fill(204, 101, 192);
        rect(20, 20, 1600, 500);

        //button = createButton('NA GERTYCHA');
        //button.position(400, 400);
        //button.size(100, 50);

        httpPost(
            url,
            'json',
            data,
            dataPosted,
            dataError
        );
        //const ob = {
        //    title: "Nazwa posta",
        //    body: "Lorem ipsum dolor sit amet consectetur...",
        //    userId: 1
        //};

        //fetch(url, {
        //    method: "post",
        //    headers: {
        //        "Content-type": "application/json; charset=UTF-8"
        //    },
        //    body: JSON.stringify(ob)
        //    })
        //    .then(res => res.json())
        //    .then(res => {
        //        console.log("Dodałem użytkownika:");
        //        console.log(res);
        //    });

        //httpDo(url, {
        //    method: "post",
        //    body: JSON.stringify(data),
        //    headers: new Headers({
        //        "Content-Type": "application/json"
        //    })
        //    }) .then(function (data) {
        //        console.log("SENDED");
        //    })  .then(function (data) {
        //        console.log("Error");
        //    });
        //}



        dice_clicked = false;
    }
}