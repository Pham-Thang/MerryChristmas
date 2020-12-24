var opened = false;
var animations = [
    "blind", "bounce", "clip", "drop", "explode", "fade", "fold", "highlight", "puff", "pulsate", "scale", "shake", "size", "slide"
]
var gifts = $('.item').click(giftOnClick);
$("#dial").dialog({
    autoOpen: false,
    resizable: false,
    width: "auto",
    height: "auto",
    modal: true,
    show: {
        effect: animations[Math.floor(Math.random() * animations.length)],
        duration: 1000
    },
    hide: {
        effect: animations[Math.floor(Math.random() * animations.length)],
        duration: 1000
    },
    buttons: {
        OK: function() {
            $( this ).dialog( "close" );
        }
    }
});

function giftOnClick() {
    var text;
    if (!opened) {
        text = texts[Math.floor(Math.random() * texts.length)];
        opened = true;
    } else {
        text = "Mở một hộp thôi chứ, hộp này để cho người khác nhé!";
    }
    $('.text').html(text);
    $("#dial").dialog("open");
}

var texts = [
    "Người đang đọc những dòng tin này có vị trí rất đặc biệt trong tim mình. Vì vậy, hãy luôn vui vẻ vào mỗi buổi sáng khi cậu thức giấc bởi luôn có tớ nghĩ đến cậu. Chúc cậu có một mùa Giáng Sinh an lành, hạnh phúc!",
    "Chúc những người bạn thân yêu của tớ có một mùa Giáng Sinh ấm áp, an lành và may mắn. Tớ mong mọi điều tốt đẹp nhất sẽ đến với các bạn. Merry Christmas!",
    "Giáng Sinh tới rồi, tớ chẳng biết làm gì hơn ngoài gửi tới bạn những lời chúc thân thương nhất. Chúc cho người bạn xinh đẹp của tớ luôn vui vẻ, hạnh phúc, gặp nhiều may mắn trong công việc cũng như cuộc sống. Cảm ơn vì đã luôn đồng hành cùng những vui buồn của tớ suốt thời gian qua. Merry Christmas!",
    "Có 1 ông già Noel đang ngồi câu cá, có 1 chiếc lá đang lơ lửng trên cây, có 1 con công đang quay vòng tập múa, có 1 công chúa đang ngủ trong rừng và có 1 thằng khùng đang đọc tin nhắn...! Chúc mày Giáng Sinh vui vẻ nhé!",
    "Nếu bạn nhận được tin nhắn này, có nghĩa là luôn có một người mong bạn vui vẻ, hạnh phúc, may mắn và yêu đời. Chúc mừng Giáng Sinh an lành và ấm áp nhé bạn của tôi!",
    "Bạn biết không, sự hiện diện của bạn đã làm cho những ngôi sao trên bầu trời sáng hơn và những ngày mùa đông giá lạnh trở nên ấm áp hơn. Chúc mừng Giáng Sinh an lành, may mắn tới với bạn - người mà tôi luôn yêu quý, trân trọng",
    "Một mùa Giáng Sinh nữa lại về rồi. Chúc cho ai đó hạnh phúc bên một nửa yêu thương, chúc ai đó đang cô đơn sẽ sớm tìm được bờ vai ấm áp và chúc cho ai đó sẽ tìm được nhau sau tháng ngày xa cách. Merry Christmas!",
    "Noel đến rồi, chúc cho bạn có được những gì tốt đẹp nhất. Chúc cho nụ cười tươi luôn nở trên đôi môi của bạn.",
    "Có 20 thiên thần thì 19 thiên thần đang ngủ còn 1 thiên thần đang đọc tin nhắn của tôi. Chúc cho thiên thần đáng yêu này có một mùa Giáng Sinh an lành, hạnh phúc nhé!",
    "Giáng Sinh đang tới! Chúc cho bạn của tôi luôn mạnh khỏe, tiền đầy ví, tình đầy tim nhé! Merry Christmas!"
]