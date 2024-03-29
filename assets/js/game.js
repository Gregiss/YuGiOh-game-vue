var destroy = new Audio("./assets/audio/destroy2.mp3" );

const app = new Vue({
    el: "#app",
    data:{
        save: null,
        where: {"name" : "newGame"},
        oponentes: [
            {"name" : "Yugi",
            "image" :
            "https://uploads3.yugioh.com/character/3/detail/detail/yamiyugi-l.png?1371744397"
            },
            {"name" : "Yugi",
            "image" :
            "https://vignette.wikia.nocookie.net/yugioh/images/2/23/SetoKaiba-DL.png/revision/latest?cb=20190614200609"
            }
        ],
        cards: [
            {ataque : 2600, defesa: 1800, image: "1.png", "moved": false, "selected": false, "die": false },
            {ataque: 2000, defesa: 800, image: "2.png" , "moved": false, "selected": false, "die": false },
            {ataque: 950, defesa: 1950, image: "3.png" , "moved": false, "selected": false, "die": false },
            {ataque: 200, defesa: 800, image: "4.png" , "moved": false, "selected": false, "die": false },
            {ataque: 1200, defesa: 100, image: "5.png" , "moved": false, "selected": false, "die": false },
            {ataque: 800, defesa: 1600, image: "6.png" , "moved": false, "selected": false, "die": false },
            {ataque: 1800, defesa: 1600, image: "7.png" , "moved": false, "selected": false, "die": false },
            {ataque: 2500, defesa: 1000, image: "8.png" , "moved": false, "selected": false, "die": false },
            {ataque: 1200, defesa: 800, image: "9.png" , "moved": false, "selected": false, "die": false },
            {ataque: 1300, defesa: 500, image: "10.png" , "moved": false, "selected": false, "die": false },
            {ataque: 500, defesa: 1500, image: "11.png" , "moved": false, "selected": false, "die": false },
            {ataque: 1800, defesa: 1500, image: "12.png" , "moved": false, "selected": false, "die": false },
            {ataque: 2000, defesa: 0, image: "13.png" , "moved": false, "selected": false, "die": false },
            {ataque: 100, defesa: 2000, image: "14.png" , "moved": false, "selected": false, "die": false },
            {ataque: 800, defesa: 1200, image: "15.png" , "moved": false, "selected": false, "die": false },
            {ataque: 1700, defesa: 200, image: "16.png" , "moved": false, "selected": false, "die": false },
            {ataque: 900, defesa: 900, image: "17.png" , "moved": false, "selected": false, "die": false },
            {ataque: 1600, defesa: 1800, image: "18.png" , "moved": false, "selected": false, "die": false },
            {ataque: 400, defesa: 300, image: "19.png" , "moved": false, "selected": false, "die": false },
            {ataque: 2600, defesa: 2100, image: "20.png" , "moved": false, "selected": false, "die": false },
            {ataque: 1700, defesa: 1200, image: "21.png" , "moved": false, "selected": false, "die": false },
            {ataque: 1600, defesa: 1200, image: "22.png" , "moved": false, "selected": false, "die": false },
            {ataque: 1000, defesa: 100, image: "23.png" , "moved": false, "selected": false, "die": false },
        ],
        hoverCard: {ataque : 2600, defesa: 1800, image: "1.png"},
        enemyDuelo: null,
        hoverCardCond: false,
        myHand: [
        ],
        enemyHand: [
        ],
        myDropCard: [],
        enemyDropCard: [],
        cardId: [],
        vez: 0,
        quantidadeDeJogadas: 0,
        attack: -1,
        myCardSelected: {},
        enemyCardSelected: {},
        player: {"life" : 20000},
        enemyPlayer: {"life" : 20000}
    },
    methods:{
        acess(name){
            let linkTemp = {"name": name}
            this.where = linkTemp
            console.log(this.where.name)
        },
        selectEnemy(enemy){
            this.enemyDuelo = enemy
            this.acess("duel")
            this.newDuel()
        },
        newDuel(){
            this.mountMyHand()
            this.mountEnemyHand()
        },
        mountMyHand(){
            this.bugFix()
            for(var i = 0; i <= 5; i++){
            var randomCard = Math.floor(Math.random() * this.cards.length)
            for(var i = 0; i < this.myHand.length; i++){
                while(this.myHand[i] == this.cards[randomCard]){
                    randomCard = Math.floor(Math.random() * this.cards.length)
                    while(this.enemyHand[i] == this.cards[randomCard]){
                        randomCard = Math.floor(Math.random() * this.cards.length)
                    }
                }
            }
            this.myHand.push(this.cards[randomCard])
            }
        },
        mountEnemyHand(){
            this.bugFix()
            for(var i = 0; i <= 5; i++){
            var randomCard = Math.floor(Math.random() * this.cards.length)
            for(var i = 0; i < this.enemyHand.length; i++){
            while(this.myHand[i] == this.cards[randomCard]){
                randomCard = Math.floor(Math.random() * this.cards.length)
                while(this.enemyHand[i] == this.cards[randomCard]){
                    randomCard = Math.floor(Math.random() * this.cards.length)
                }
            }
            }
            this.enemyHand.push(this.cards[randomCard])
            }
        },
        cardOut(card){
            const idCard = this.myHand.indexOf(card)
            this.hoverCard = card
        },
        cardOver(card){
            const idCard = this.myHand.indexOf(card)
            this.hoverCard = card
        },
        cardOver(card, a){
            for(var i = 0; i < this.enemyDropCard.length; i++){
                this.enemyDropCard[i].die = false
                this.enemyDropCard[i].selected = false
            }
            const idCard = this.myHand.indexOf(card)
            this.hoverCard = card
            this.myHand[idCard].selected = true
        },
        cardOut(card, a){
            const idCard = this.myHand.indexOf(card)
            this.hoverCard = card
            this.myHand[idCard].selected = false
        },
        playCard(card){
            this.bugFix()
            if(this.vez == 0){
            const idCard = this.myHand.indexOf(card)
            this.myHand[idCard].moved = true
            var cardParaMesa = this.myHand[idCard]
            setTimeout(() => this.myHand[idCard].moved = false , 300);
            setTimeout(() => this.myHand.splice(idCard, 1) , 300);
            setTimeout(() => this.myDropCard.push(cardParaMesa) , 300);
            this.vez = 1
            if(this.quantidadeDeJogadas == 0){
            setTimeout(() => this.playBot() , 1600)
            }
            this.quantidadeDeJogadas++
            }

            for(var i = 0; i < this.myDropCard.length; i++){
                this.myDropCard[i].selected = false
            }
            
        },
        comprarCardMe(){
            this.bugFix()
                var randomCard = Math.floor(Math.random() * this.cards.length)
                for(var i = 0; i < this.myHand.length; i++){
                    while(this.myHand[i] == this.enemyHand[randomCard]){
                        while(this.enemyHand[i] == this.cards[randomCard]){
                            randomCard = Math.floor(Math.random() * this.cards.length)
                        }
                        randomCard = Math.floor(Math.random() * this.cards.length)
                    }
                }
            const card = this.cards[randomCard]
            this.myHand.push(card)
        },
        comprarCardBot(){
            this.bugFix()
            var randomCard = Math.floor(Math.random() * this.cards.length)
            for(var i = 0; i < this.enemyHand.length; i++){
            while(this.myHand[i] == this.enemyHand[randomCard]){
                randomCard = Math.floor(Math.random() * this.cards.length)
                while(this.enemyHand[i] == this.cards[randomCard]){
                    randomCard = Math.floor(Math.random() * this.cards.length)
                }
            }
            }
            const card = this.cards[randomCard]
            this.enemyHand.push(card)
        },
        bugFix(){
            for(var i = 0; i < this.myDropCard.length; i++){
                this.myDropCard[i].die = false
                this.myDropCard[i].selected = false
            }
            for(var i = 0; i < this.enemyDropCard.length; i++){
                this.enemyDropCard[i].die = false
                this.enemyDropCard[i].selected = false
            }
            for(var i = 0; i < this.myHand.length; i++){
                this.myHand[i].die = false
                this.myHand[i].selected = false
            }
        },
        playBot(){
            this.bugFix()
            this.quantidadeDeJogadas++
            this.attack = -1
            if(this.vez == 1){
            const randomCard = Math.floor(Math.random() * this.enemyHand.length)
            const botCardPlay = this.enemyHand[randomCard]
            const idCard = this.enemyHand.indexOf(botCardPlay)
            this.enemyHand[idCard].moved = true
            setTimeout(() => this.enemyHand[idCard].moved = false , 300)
            setTimeout(() => this.enemyHand.splice(idCard, 1) , 300)
            setTimeout(() => this.enemyDropCard.push(botCardPlay) , 300)
            setTimeout(() => this.comprarCardMe() , 300)
            setTimeout(() => this.comprarCardBot() , 300)
            if(this.quantidadeDeJogadas > 2){
            setTimeout(() => this.botAttackCard() , 1500)
            } else{
                this.vez = 0
                this.attack = 0
            }
            }
        },
        selectAttack(card){
            this.bugFix()
            const idCard = this.myDropCard.indexOf(card)
            this.myCardSelected = this.myDropCard[idCard]
            if(this.attack == 0){
            this.vez = 0
            for(var i = 0; i < this.myDropCard.length; i++){
                this.myDropCard[i].selected = false
            }
            this.myDropCard[idCard].selected = true
            }
        },
        botAttackCard(){
            this.bugFix()
            if(this.enemyDropCard.length == 0){
                return
            }
            var cartaId = 0
            if(this.myDropCard.length > 0){
                var myCardId = Math.floor(Math.random() * this.myDropCard.length)
                this.myCardSelected = this.myCardSelected[myCardId]
            } else{
                var myCardId = 0
            }
            console.log(cartaId + myCardId)
            this.enemyCardSelected = this.enemyDropCard[cartaId]
            if(this.myDropCard.length == 0){
                if(this.enemyDropCard.length == 0){
                    this.vez = 0
                    this.attack = 0
                } else{
                    this.player.life -= this.enemyCardSelected.ataque
                }
            } else{
                if(this.enemyDropCard.length == 0){
                    return
                }
             else{
                destroy.play()
                this.enemyCardSelected = this.enemyDropCard[0]
                this.myCardSelected = this.myDropCard[0]
                if(this.enemyDropCard[0].ataque < this.myDropCard[0].ataque){
                    this.enemyDropCard[0].die = true
                    setTimeout(() =>this.cardsDie(0) , 1900)
                } else if(this.enemyDropCard[0].ataque == this.myDropCard[0].ataque){
                    setTimeout(() => this.cardsDie(2) , 1900)
                    this.enemyDropCard[0].die = true
                    this.myDropCard[0].die = true
                } else{
                    this.myDropCard[0].die = true
                    setTimeout(() => this.cardsDie(1) , 1900)
                }
                this.player.life -= this.myCardSelected.ataque + this.enemyCardSelected.ataque
            }
            }
            this.vez = 0
            this.attack = 0
        },
        attackCard(card){
            this.enemyCardSelected = card
            if(this.myCardSelected !== null && this.enemyCardSelected !== null){
            destroy.play()  
            if(this.vez == 0){
            if(this.attack == 0){
            for(var i = 0; i < this.myDropCard.length; i++){
                this.myDropCard[i].selected = false
            }
            const idCardMorre = this.myDropCard.indexOf(this.myCardSelected)
            const idCard = this.enemyDropCard.indexOf(this.enemyCardSelected)
            console.log(idCard +""+ idCardMorre)
            if(this.enemyDropCard[idCard].ataque < this.myCardSelected.ataque){
                this.enemyDropCard[idCard].die = true
                setTimeout(() =>this.cardsDie(0) , 1900)
            } else if(this.enemyDropCard[idCard].ataque == this.myCardSelected.ataque){
                this.enemyDropCard[idCard].die = true
                this.myDropCard[idCardMorre].die = true
                setTimeout(() => this.cardsDie(2) , 1900)
            } else{
                this.myDropCard[idCardMorre].die = true
                setTimeout(() => this.cardsDie(1) , 1900)
            }
            this.vez = 1
            this.attack = 1
            setTimeout(() => this.playBot() , 1600)
            }
            }
            }
            },
            atackDireto(){
                this.bugFix()
                if(this.myCardSelected !== null){
                if(this.vez == 0){
                    if(this.attack == 0){
                        if(this.enemyDropCard.length == 0){
                            this.enemyPlayer.life -= this.myCardSelected.ataque
                            this.vez = 1
                            this.attack = 1
                            this.playBot()
                        }
                    }
                }
            }
            },
            cardsDie(quem){
                if(quem == 0){
                    var idCard = this.enemyDropCard.indexOf(this.enemyCardSelected)
                    this.enemyPlayer.life -= this.enemyCardSelected.ataque + this.myCardSelected.ataque
                    this.enemyDropCard.splice(idCard, 1)
                } else if(quem == 1){
                    var idCard = this.myDropCard.indexOf(this.myCardSelected)
                    this.player.life -= this.enemyCardSelected.ataque + this.myCardSelected.ataque
                    this.myDropCard.splice(idCard, 1)
                } else if(quem == 2){
                    var idCardMorre = this.myDropCard.indexOf(this.myCardSelected)
                    var idCard = this.enemyDropCard.indexOf(this.enemyCardSelected)
                    this.myDropCard.splice(idCardMorre, 1)
                    this.enemyDropCard.splice(idCard, 1) 
                }
            }
    }
})
