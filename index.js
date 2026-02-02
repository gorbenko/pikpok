const urls = [
    "videos/-425148686832983381.MP4",
    "videos/-1058613081809774571.MP4",
    "videos/-1381854028232193089.MP4",
    "videos/-2466797579047759691.MP4",
    "videos/-2635594312504430960.MP4",
    "videos/-5621414600942581877.MP4",
    "videos/-6974447037748169156.MP4",
    "videos/-8449397279292773021.MP4",
    "videos/3698940505591559678.MP4",
    "videos/3746059563046546718.MP4",
    "videos/3782221046270698096.MP4",
    "videos/6702137189532704568.MP4",
    "videos/6737137111559968548.MP4",
    "videos/7578542087815133230.MP4",
    "videos/7870372071727092435.MP4",
];

const VIDEO_ITEM_CLS = '.video-item';
const VIDEO_NAME_CLS = '.video-name';
const PLAYER_CLS = '.player';

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const getVideosLength = () => $$(VIDEO_ITEM_CLS).length;

const addVideoItem = observer => {
    const idx = getVideosLength();
    const src = urls[idx];

    if (!src) return;

    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.classList.add(VIDEO_ITEM_CLS.substring(1));
    video.setAttribute('data-idx', idx);
    $(PLAYER_CLS).appendChild(video);
    observer.observe(video);
}

const main = () => {
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play();
                    const currentIdx = Number(entry.target.getAttribute('data-idx'));

                    if (currentIdx + 1 === getVideosLength()) {
                        addVideoItem(observer);
                    }

                    $(VIDEO_NAME_CLS).innerHTML = urls[currentIdx];
                } else if (!entry.target.paused && !entry.target.ended) {
                    entry.target.pause();
                }
            })
        }, {
            threshold: 0.5,
        });

        $$(VIDEO_ITEM_CLS).forEach(video => observer.observe(video));
    }
}

document.addEventListener('DOMContentLoaded', main, false)
