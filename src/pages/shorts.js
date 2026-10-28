import React, { useContext, useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Flame, Play, Volume2, VolumeX } from 'lucide-react';
import { AppContext } from '../context/appcontext.js';

const h = React.createElement;

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60';

const isVideoUrl = (url) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url || '');

const parseCount = (value) => {
  const str = String(value || '0').trim().toUpperCase();
  const num = parseFloat(str);
  if (isNaN(num)) return 0;
  if (str.endsWith('M')) return Math.round(num * 1000000);
  if (str.endsWith('K')) return Math.round(num * 1000);
  return Math.round(num);
};

const formatCount = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
  return String(n);
};

function ShortCard({ short }) {
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  const hasVideo = isVideoUrl(short.videoUrl);
  const image = short.thumbnail || (!hasVideo ? short.videoUrl : '') || FALLBACK_IMAGE;
  const likesCount = parseCount(short.likes) + (liked ? 1 : 0);

  useEffect(() => {
    if (!hasVideo || !cardRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      const video = videoRef.current;
      if (!video) return;

      if (entry.isIntersecting) {
        video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }, { threshold: 0.6 });

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hasVideo]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const stop = (fn) => (e) => {
    e.stopPropagation();
    fn();
  };

  return h('section', { className: 'h-full snap-start snap-always flex items-center justify-center py-4' },
    h('div', {
      ref: cardRef,
      onClick: hasVideo ? togglePlay : undefined,
      className: 'relative h-full max-h-[640px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col justify-end p-4'
    },

      hasVideo
        ? h('video', {
            ref: videoRef,
            src: short.videoUrl,
            poster: image,
            loop: true,
            muted: muted,
            playsInline: true,
            className: 'absolute inset-0 w-full h-full object-cover'
          })
        : h('img', {
            src: image,
            alt: short.title,
            onError: (e) => { e.target.src = FALLBACK_IMAGE; },
            className: 'absolute inset-0 w-full h-full object-cover opacity-90'
          }),

      h('div', { className: 'absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none' }),

      h('div', { className: 'absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold z-10' },
        h(Flame, { className: 'w-4 h-4 text-red-500 fill-red-500' }),
        'Shorts'
      ),

      hasVideo && h('button', {
        onClick: stop(() => setMuted(!muted)),
        className: 'absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white z-10 cursor-pointer'
      },
        muted ? h(VolumeX, { className: 'w-4 h-4' }) : h(Volume2, { className: 'w-4 h-4' })
      ),

      hasVideo && !playing && h('div', { className: 'absolute inset-0 flex items-center justify-center pointer-events-none z-10' },
        h('div', { className: 'p-5 bg-black/50 rounded-full' },
          h(Play, { className: 'w-8 h-8 text-white fill-white' })
        )
      ),

      h('div', { className: 'absolute right-3 bottom-16 flex flex-col items-center gap-5 text-white z-10' },
        h('button', {
          onClick: stop(() => setLiked(!liked)),
          className: 'flex flex-col items-center gap-1 hover:scale-110 transition-transform cursor-pointer'
        },
          h('div', { className: 'p-3 bg-gray-800/60 backdrop-blur-md rounded-full' },
            h(Heart, { className: `w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'fill-white'}` })
          ),
          h('span', { className: 'text-xs font-semibold' }, formatCount(likesCount))
        ),
        h('button', {
          onClick: (e) => e.stopPropagation(),
          className: 'flex flex-col items-center gap-1 hover:scale-110 transition-transform cursor-pointer'
        },
          h('div', { className: 'p-3 bg-gray-800/60 backdrop-blur-md rounded-full' }, h(MessageCircle, { className: 'w-6 h-6' })),
          h('span', { className: 'text-xs font-semibold' }, short.comments || '0')
        ),
        h('button', {
          onClick: handleShare,
          className: 'flex flex-col items-center gap-1 hover:scale-110 transition-transform cursor-pointer'
        },
          h('div', { className: 'p-3 bg-gray-800/60 backdrop-blur-md rounded-full' }, h(Share2, { className: 'w-6 h-6' })),
          h('span', { className: 'text-xs font-semibold' }, copied ? 'Nusxalandi' : 'Ulashish')
        )
      ),

      h('div', { className: 'relative z-10 pr-16 flex flex-col gap-2' },
        h('div', { className: 'flex items-center gap-2' },
          h('div', { className: 'w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs' },
            (short.channel || 'U').charAt(0).toUpperCase()
          ),
          h('span', { className: 'text-white font-semibold text-sm truncate' }, short.channel || 'Kanal'),
          h('button', {
            onClick: stop(() => setSubscribed(!subscribed)),
            className: `ml-1 px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              subscribed ? 'bg-gray-700 text-white' : 'bg-white text-black hover:bg-gray-200'
            }`
          }, subscribed ? 'Obuna bo\'lingan' : 'Obuna bo\'lish')
        ),
        h('p', { className: 'text-white text-sm font-medium line-clamp-2' }, short.title)
      )
    )
  );
}

function Shorts() {
  const { shorts } = useContext(AppContext);

  if (!shorts || shorts.length === 0) {
    return h('div', { className: 'flex-1 bg-gray-900 h-[calc(100vh-56px)] flex items-center justify-center p-6' },
      h('div', { className: 'text-white font-medium text-center bg-gray-800 p-6 rounded-2xl border border-gray-700' },
        'Hozircha Shorts videolar kiritilmagan. Admin panel orqali qo\'shing!'
      )
    );
  }

  return h('div', { className: 'flex-1 bg-gray-900 h-[calc(100vh-56px)] overflow-y-auto snap-y snap-mandatory' },
    shorts.map((short) => h(ShortCard, { key: short.id, short }))
  );
}

export default Shorts;