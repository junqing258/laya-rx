import View=laya.ui.View;
import Dialog=laya.ui.Dialog;



export module ui.fragment {
    import FrameAnimation = Laya.FrameAnimation;
    import View = Laya.View;
    import Image = Laya.Image;
    import Label = Laya.Label;
    
    export class FooterUI extends View {
        public btnMinus: Image;
        public btnAdd: Image;
        public btnMax: Image;
        public btnPlay: Image;
        public betLabel: Label;
        public winLabel: Label;
        
        public static uiView:any = {"type":"View","props":{"width":1334,"height":115},"child":[{"type":"Image","props":{"skin":"fragment/img_footer.png"}},{"type":"Image","props":{"y":17,"x":489,"skin":"fragment/icon_win.png"}},{"type":"Image","props":{"y":33,"x":163,"skin":"fragment/ft_bet.png"}},{"type":"Image","props":{"y":38,"x":67,"var":"btnMinus","skin":"fragment/b_minus.png"}},{"type":"Image","props":{"y":38,"x":393,"var":"btnAdd","skin":"fragment/b_add.png"}},{"type":"Image","props":{"y":38,"x":866,"var":"btnMax","skin":"fragment/b_max.png"}},{"type":"Image","props":{"y":34,"x":972,"var":"btnPlay","skin":"fragment/b_play.png"}},{"type":"Image","props":{"y":56,"x":177,"skin":"fragment/toubie.png"}},{"type":"Label","props":{"y":59,"x":265,"width":106,"var":"betLabel","text":"500000","font":"bet_amount","align":"center"}},{"type":"Image","props":{"y":44,"x":542,"skin":"fragment/houde.png"}},{"type":"Label","props":{"y":45,"x":611,"width":169,"var":"winLabel","text":"3500","height":36,"font":"win_amount","align":"center"}}]};
        
        constructor() { super(); }
        createChildren():void {
            super.createChildren();
            this.createView(fragment.FooterUI.uiView);
        }
    }
}

export module ui.fragment {
    import FrameAnimation = Laya.FrameAnimation;
    import View = Laya.View;
    import Image = Laya.Image;
    import Label = Laya.Label;
    
    export class HeadUI extends View {
        public yuLabe: Label;
        public douLabe: Label;
        
        public static uiView:any = {"type":"View","props":{"width":1334,"height":86},"child":[{"type":"Image","props":{"skin":"fragment/head_img.png"}},{"type":"Image","props":{"y":0,"x":1334,"skin":"fragment/head_img.png","scaleX":-1}},{"type":"Image","props":{"y":0,"x":542,"skin":"fragment/img_logo.png"}},{"type":"Image","props":{"y":7,"x":25,"skin":"fragment/b_back.png"}},{"type":"Image","props":{"y":7,"x":150,"skin":"fragment/b_rank.png"}},{"type":"Image","props":{"y":17,"x":273,"skin":"fragment/img_yu.png"}},{"type":"Image","props":{"y":15,"x":818,"skin":"fragment/img_dou.png"}},{"type":"Image","props":{"y":7,"x":1070,"skin":"fragment/b_home.png"}},{"type":"Image","props":{"y":7,"x":1195,"width":115,"skin":"fragment/b_menu.png","height":68}},{"type":"Image","props":{"y":10,"x":1002,"skin":"fragment/b_recharge.png"}},{"type":"Label","props":{"y":32,"x":326,"width":148,"var":"yuLabe","text":"1,234,456","height":22,"font":"acount_info","align":"center"}},{"type":"Label","props":{"y":32,"x":871,"width":123,"var":"douLabe","text":"1,234,456","height":22,"font":"acount_info","align":"center"}}]};
        
        constructor() { super(); }
        createChildren():void {
            super.createChildren();
            this.createView(fragment.HeadUI.uiView);
        }
    }
}

export module ui.senses {
    import FrameAnimation = Laya.FrameAnimation;
    import View = Laya.View;
    import Image = Laya.Image;
    import Label = Laya.Label;
    
    export class LoaddingUI extends View {
        public progressBar: Image;
        public progressLabel: Label;
        
        public static uiView:any = {"type":"View","props":{"width":1334,"height":750},"child":[{"type":"Image","props":{"skin":"loadding/bgloadding.jpg"}},{"type":"Image","props":{"x":74,"skin":"loadding/desc.png","bottom":35}},{"type":"Image","props":{"x":232,"skin":"loadding/prgwrap.png","centerY":235},"child":[{"type":"Image","props":{"y":7,"x":10,"width":14,"var":"progressBar","skin":"loadding/prbbar.png","sizeGrid":"0,14,0,14"}}]},{"type":"Image","props":{"x":330,"skin":"loadding/logo.png","centerY":-70}},{"type":"Label","props":{"x":523,"width":287,"var":"progressLabel","text":"正在加载中...99%","height":24,"fontSize":24,"font":"SimHei","color":"#edc8a6","centerY":185,"align":"center"}}]};
        
        constructor() { super(); }
        createChildren():void {
            super.createChildren();
            this.createView(senses.LoaddingUI.uiView);
        }
    }
}
