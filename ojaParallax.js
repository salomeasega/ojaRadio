function scrollFooter(scrollY, heightFooter)
{
    console.log(scrollY);
    console.log(heightFooter);

    if(scrollY >= heightFooter)
    {
        $('footer').css({
            'bottom' : '0px'
        });
    }
    else
    {
        $('footer').css({
            'bottom' : '-' + heightFooter + 'px'
        });
    }
}

$(window).load(function(){
    var windowHeight        = $(window).height(),
        footerHeight        = $('footer').height(),
        heightDocument      = (windowHeight) + ($('.content').height()) + ($('footer').height()) - 20;

    // Definindo o tamanho do elemento pra animar
    $('#scroll-animate, #scroll-animate-main').css({
        'height' :  heightDocument + 'px'
    });

    // Definindo o tamanho dos elementos header e conteúdo
    $('header').css({
        'height' : windowHeight + 'px',
        'line-height' : windowHeight + 'px'
    });

    $('.wrapper-parallax').css({
        'margin-top' : windowHeight + 'px'
    });

    scrollFooter(window.scrollY, footerHeight);

    // ao dar rolagem
    window.onscroll = function(){
        var scroll = window.scrollY;

        $('#scroll-animate-main').css({
            'top' : '-' + scroll + 'px'
        });
        
        $('header').css({
            'background-position-y' : 50 - (scroll * 100 / heightDocument) + '%'
        });

        scrollFooter(scroll, footerHeight);
    }
// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent',  navigator.userAgent);
b.setAttribute('data-platform', navigator.platform );


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/ojbkfm/
jQuery(function ($) {
    var supportsAudio = !! document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false;
        mediaPath = 'https://archive.org/download/ojbkfm/',
        extension = '',
        tracks = [{
            "track": 1,
            "name": "MemoriesoftheEast1",
            "length": "51:16",
            "file": "MemoriesoftheEast1"
        }, {
            "track": 2,
            "name": "The Forsaken -- Broadwing Studio (Final Mix)",
            "length": "08:30",
            "file": "BS_TF"
        }, {
            "track": 3,
            "name": "All The King's Men -- Broadwing Studio (Final Mix)",
            "length": "05:01",
            "file": "BS_ATKM"
        }, {
            "track": 4,
            "name": "The Forsaken -- Broadwing Studio (First Mix)",
            "length": "08:32",
            "file": "BSFM_TF"
        }, {
            "track": 5,
            "name": "All The King's Men -- Broadwing Studio (First Mix)",
            "length": "05:05",
            "file": "BSFM_ATKM"
        }, {
            "track": 6,
            "name": "All This Is -- Alternate Cuts",
            "length": "02:49",
            "file": "AC_ATI"
        }, {
            "track": 7,
            "name": "All The King's Men (Take 1) -- Alternate Cuts",
            "length": "05:44",
            "file": "AC_ATKMTake_1"
        }, {
            "track": 8,
            "name": "All The King's Men (Take 2) -- Alternate Cuts",
            "length": "05:27",
            "file": "AC_ATKMTake_2"
        }, {
            "track": 9,
            "name": "Magus -- Alternate Cuts",
            "length": "05:46",
            "file": "AC_M"
        }, {
            "track": 10,
            "name": "The State Of Wearing Address (fucked up) -- Alternate Cuts",
            "length": "05:25",
            "file": "AC_TSOWAfucked_up"
        }, {
            "track": 11,
            "name": "Magus -- Popeye's (New Years '04 - '05)",
            "length": "05:53",
            "file": "PNY04-05_M"
        }],
        trackCount = tracks.length,
        npAction = $('#npAction'),
        npTitle = $('#npTitle'),
        audio = $('#audio1').bind('play', function () {
            playing = true;
            npAction.text('Now Playing...');
        }).bind('pause', function () {
            playing = false;
            npAction.text('Paused...');
        }).bind('ended', function () {
            npAction.text('Paused...');
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                audio.play();
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }).get(0),
        btnPrev = $('#btnPrev').click(function () {
            if ((index - 1) > -1) {
                index--;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        btnNext = $('#btnNext').click(function () {
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
        li = $('#plList li').click(function () {
            var id = parseInt($(this).index());
            if (id !== index) {
                playTrack(id);
            }
        }),
        loadTrack = function (id) {
            $('.plSel').removeClass('plSel');
            $('#plList li:eq(' + id + ')').addClass('plSel');
            npTitle.text(tracks[id].name);
            index = id;
            audio.src = mediaPath + tracks[id].file + extension;
        },
        playTrack = function (id) {
            loadTrack(id);
            audio.play();
        };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

