$(document).ready(function () {
    console.log("jQuery 연동 성공!");

    // 1. 초기 화면 설정
    $('#char-name').text('장송의 프리렌');
    $('#char-story').text('좌측 캐릭터를 클릭해서 이야기를 시작하세요');

    // 2. 오디오 관련 설정 (반드시 ready 안에 넣으세요)
    const music = $('#main-audio')[0];
    const $btn = $('#play-pause-btn');
    const $icon = $btn.find('.icon');

    $btn.on('click', function () {
        if (music.paused) {
            music.play();
            $icon.text('⏸');
            $btn.addClass('is-playing');
        } else {
            music.pause();
            $icon.text('▶');
            $btn.removeClass('is-playing');
        }
    });
});

// 3. 캐릭터 선택 함수 (이건 외부에 있어도 괜찮습니다)
let typingTimer;

function selectChar(element, charName) {
    console.log(charName + " 선택됨");

    $('.char-item').removeClass('active');
    $(element).addClass('active');

    var charData = {
        Frieren: {
            img: 'assets/imges/frieren.png', // 경로 오타 주의: imges -> images 확인 필요
            name: '프리렌｜Frieren',
            story: '천 년 이상 사는 엘프로, 용사 파티로서 마왕을 쓰러뜨린 마법사'
        },
        Fern: {
            img: 'assets/imges/fern.png',
            name: '페른｜Fern',
            story: '프리렌의 제자로서 함께 여행을 하게 되는 마법사.'
        },
        Stark: {
            img: 'assets/imges/stark.png',
            name: '슈타르크｜Stark',
            story: '프리렌과 페른과 함께 여행을 떠나게 되는 전사로, 아이젠의 제자.'
        }
    };

    var selected = charData[charName];
    if (selected) {
        // 애니메이션 효과
        $('#char-img').addClass('fade-out');
        setTimeout(function () {

            $('#char-img').attr('src', selected.img).attr('alt', selected.name);
            $('#char-name').text(selected.name);
            $('#char-img').removeClass('fade-out');
            
            //글자 타이핑 효과
            startTyping($('#char-story'), selected.story);
        }, 300);
    }
}
function startTyping($element, text) {
    clearTimeout(typingTimer);
    $element.html(''); // text('') 대신 html('')로 초기화
    
    let i = 0;
    function type() {
        if (i < text.length) {
            // 글자 하나하나를 span으로 감싸고 'char-fade' 클래스를 부여합니다.
            let char = text.charAt(i);
            let $span = $('<span class="char-fade">' + char + '</span>');
            $element.append($span);
            
            // 약간의 시차를 두고 애니메이션 클래스 추가
            setTimeout(function() {
                $span.addClass('visible');
            }, 10);

            i++;
            typingTimer = setTimeout(type, 60); // 속도를 60ms로 살짝 늦추면 더 우아합니다.
        }
    }
    type();
}