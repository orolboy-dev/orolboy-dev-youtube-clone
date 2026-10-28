import React, { useState, useContext } from 'react';
import { PlusCircle, ShieldCheck, Image as ImageIcon, Trash2, Edit3, Check, X, AlertTriangle, Hash, Layers, Flame, Video } from 'lucide-react';
import { AppContext } from '../context/appcontext.js';

const h = React.createElement;

const PRESET_THUMBNAILS = [
  { id: '1', name: 'Gaming / O\'yinlar', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60' },
  { id: '2', name: 'Music / Musiqa', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60' },
  { id: '3', name: 'Coding / Dasturlash', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60' },
  { id: '4', name: 'News / Yangiliklar', url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&auto=format&fit=crop&q=60' }
];

const CATEGORIES = ['Gaming', 'Music', 'Live', 'News', 'Coding', 'Sports', 'Podcasts'];
const HASHTAG_OPTIONS = ['#gaming', '#music', '#live', '#news', '#coding', '#sports', '#podcasts'];

function Admin() {
  const {
    videos, addVideo, deleteVideo, updateVideoTitle, shorts, addShort, deleteShort,
    channelProfile, updateChannelProfile
  } = useContext(AppContext);
  const [videoLink, setVideoLink] = useState('');
  // Video turi state'i: 'long' yoki 'shorts'
  const [videoType, setVideoType] = useState('long');

  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState(channelProfile.name);
  const [selectedCategory, setSelectedCategory] = useState('Gaming');
  const [selectedHashtag, setSelectedHashtag] = useState('#gaming');
  const [selectedThumbnail, setSelectedThumbnail] = useState(PRESET_THUMBNAILS[0].url);
  const [success, setSuccess] = useState('');
  const [profileBio, setProfileBio] = useState(channelProfile.bio);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleAddContent = (e) => {
    e.preventDefault();
    if (!title || !channel) return;

    if (videoType === 'long') {
      const newVideo = {
        id: Date.now().toString(),
        title,
        channel,
        category: selectedCategory,
        hashtag: selectedHashtag,
        views: '1K views',
        time: 'Just now',
        thumbnail: selectedThumbnail
      };
      addVideo(newVideo);
      setSuccess('Long video muvaffaqiyatli Home sahifasiga qo\'shildi!');
    } else {
      const newShort = {
        id: Date.now().toString(),
        title,
        channel,
        likes: '0',
        comments: '0',
        thumbnail: selectedThumbnail,
        videoUrl: videoLink.trim() || selectedThumbnail
      };
      addShort(newShort);
      setSuccess('Shorts video muvaffaqiyatli Shorts bo\'limiga qo\'shildi!');
    }

    setTitle('');
    setChannel(channelProfile.name);
    setVideoLink('');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSaveEdit = (id) => {
    if (editTitle.trim()) {
      updateVideoTitle(id, editTitle);
      setEditingId(null);
      setSuccess('Video nomi yangilandi!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleConfirmDelete = (id, type) => {
    if (type === 'long') {
      deleteVideo(id);
    } else {
      deleteShort(id);
    }
    setConfirmDeleteId(null);
    setSuccess('Muvaffaqiyatli o\'chirildi!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSaveBio = (e) => {
    e.preventDefault();
    updateChannelProfile({ bio: profileBio.trim() });
    setSuccess('Kanal BIOsi saqlandi!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return h('div', { className: 'flex-1 p-8 bg-gray-50 min-h-[calc(100vh-56px)] overflow-y-auto' },
    h('div', { className: 'max-w-3xl mx-auto flex flex-col gap-8' },
      
      h('div', { className: 'flex items-center gap-3' },
        h(ShieldCheck, { className: 'w-8 h-8 text-red-600' }),
        h('h1', { className: 'text-2xl font-bold text-gray-900' }, 'Admin Panel - kontent Boshqaruvi')
      ),

      success && h('div', { className: 'p-4 bg-green-100 text-green-700 rounded-xl font-medium shadow-sm' }, success),

      h('form', { onSubmit: handleSaveBio, className: 'bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3' },
        h('div', null,
          h('h2', { className: 'text-lg font-bold text-gray-900' }, 'Kanal BIOsi'),
          h('p', { className: 'text-sm text-gray-500 mt-1' }, `${channelProfile.name} kanal sahifasida ko‘rinadi.`)
        ),
        h('textarea', {
          value: profileBio,
          onChange: (e) => setProfileBio(e.target.value),
          maxLength: 1000,
          rows: 4,
          placeholder: 'Kanal haqida qisqacha yozing...',
          className: 'w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 text-sm resize-y'
        }),
        h('div', { className: 'flex items-center justify-between' },
          h('span', { className: 'text-xs text-gray-500' }, `${profileBio.length}/1000`),
          h('button', { type: 'submit', className: 'px-5 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800' }, 'BIOni saqlash')
        )
      ),

      // FORM
      h('form', { onSubmit: handleAddContent, className: 'bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6' },
        
        // VIDEO TURI SELECTOR (Long vs Shorts)
        h('div', { className: 'flex flex-col gap-2' },
          h('label', { className: 'text-sm font-semibold text-gray-700' }, 'Video Turini Tanlang:'),
          h('div', { className: 'grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-xl' },
            h('button', {
              type: 'button',
              onClick: () => setVideoType('long'),
              className: `flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                videoType === 'long' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`
            },
              h(Video, { className: 'w-4 h-4' }),
              'Long Video (Home)'
            ),
            h('button', {
              type: 'button',
              onClick: () => setVideoType('shorts'),
              className: `flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                videoType === 'shorts' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`
            },
              h(Flame, { className: 'w-4 h-4' }),
              'Shorts Video'
            )
          )
        ),

        // Sarlavha
        h('div', { className: 'flex flex-col gap-1.5' },
          h('label', { className: 'text-sm font-semibold text-gray-700' }, 'Video Sarlavhasi'),
          h('input', {
            type: 'text',
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: videoType === 'long' ? 'Masalan: PUBG Mobile gameplay, React Darslari...' : 'Masalan: Tezkor React lifehack 🚀',
            className: 'px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 text-sm'
          })
        ),

        // Kanal nomi
        h('div', { className: 'flex flex-col gap-1.5' },
          h('label', { className: 'text-sm font-semibold text-gray-700' }, 'Kanal Nomi'),
          h('input', {
            type: 'text',
            value: channel,
            onChange: (e) => setChannel(e.target.value),
            placeholder: 'Masalan: Orolboy Dev',
            className: 'px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 text-sm'
          })
        ),

        // Faqat Long Video uchun Kategoriya va Xeshteg
        videoType === 'long' && h(React.Fragment, null,
          h('div', { className: 'flex flex-col gap-2' },
            h('div', { className: 'flex items-center gap-2 text-sm font-semibold text-gray-700' },
              h(Layers, { className: 'w-4 h-4 text-red-600' }),
              'Kategoriyani tanlang:'
            ),
            h('div', { className: 'flex flex-wrap gap-2' },
              CATEGORIES.map(cat => 
                h('button', {
                  type: 'button',
                  key: cat,
                  onClick: () => setSelectedCategory(cat),
                  className: `px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    selectedCategory === cat ? 'bg-black text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`
                }, cat)
              )
            )
          ),

          h('div', { className: 'flex flex-col gap-2' },
            h('div', { className: 'flex items-center gap-2 text-sm font-semibold text-gray-700' },
              h(Hash, { className: 'w-4 h-4 text-red-600' }),
              'Xeshtegni tanlang:'
            ),
            h('div', { className: 'flex flex-wrap gap-2' },
              HASHTAG_OPTIONS.map(tag => 
                h('button', {
                  type: 'button',
                  key: tag,
                  onClick: () => setSelectedHashtag(tag),
                  className: `px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    selectedHashtag === tag ? 'border-red-600 bg-red-50 text-red-600 font-bold' : 'border-gray-200 bg-white text-gray-500'
                  }`
                }, tag)
              )
            )
          )
        ),

        // Rasm tanlash
        h('div', { className: 'flex flex-col gap-2' },
          h('div', { className: 'flex items-center gap-2 text-sm font-semibold text-gray-700' },
            h(ImageIcon, { className: 'w-4 h-4 text-red-600' }),
            'Rasm / Muqova (Thumbnail) tanlang:'
          ),
          h('div', { className: 'grid grid-cols-2 sm:grid-cols-4 gap-3' },
            PRESET_THUMBNAILS.map(thumb => 
              h('div', {
                key: thumb.id,
                onClick: () => setSelectedThumbnail(thumb.url),
                className: `relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                  selectedThumbnail === thumb.url ? 'border-red-600 ring-2 ring-red-200 scale-[1.02]' : 'border-gray-200 opacity-70'
                }`
              },
                h('img', { src: thumb.url, className: 'w-10 h-14 object-cover rounded-lg' }),
                h('div', { className: 'absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] p-1 text-center truncate' }, thumb.name)
              )
            )
          )
        ),videoType === 'shorts' && h('div', { className: 'flex flex-col gap-1.5' },
  h('label', { className: 'text-sm font-semibold text-gray-700' }, 'Video havolasi (.mp4, ixtiyoriy)'),
  h('input', {
    type: 'text',
    value: videoLink,
    onChange: (e) => setVideoLink(e.target.value),
    placeholder: 'https://.../video.mp4',
    className: 'px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 text-sm'
  })
),


        // Submit Tugmasi
        h('button', {
          type: 'submit',
          className: 'mt-2 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer shadow-md'
        },
          h(PlusCircle, { className: 'w-5 h-5' }),
          videoType === 'long' ? 'Long Videoni Qo\'shish' : 'Shorts Videoni Qo\'shish'
        )
      ),

      // RO'YXAT: Long Videolar
      h('div', { className: 'bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4' },
        h('h2', { className: 'text-lg font-bold text-gray-800' }, `Long Videolar (${videos.length})`),
        videos.map(v => 
          h('div', { key: v.id, className: 'flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 gap-4' },
            h('div', { className: 'flex items-center gap-3 flex-1 overflow-hidden' },
              h('img', { src: v.thumbnail, className: 'w-16 h-10 object-cover rounded-lg' }),
              editingId === v.id 
                ? h('input', { type: 'text', value: editTitle, onChange: (e) => setEditTitle(e.target.value), className: 'px-3 py-1 border rounded-lg text-sm flex-1' })
                : h('div', { className: 'truncate' },
                    h('h4', { className: 'text-sm font-semibold text-gray-900 truncate' }, v.title),
                    h('p', { className: 'text-xs text-gray-500' }, `${v.channel} • ${v.category || 'Gaming'}`)
                  )
            ),
            h('div', { className: 'flex items-center gap-2' },
              editingId === v.id 
                ? h(React.Fragment, null,
                    h('button', { onClick: () => handleSaveEdit(v.id), className: 'p-2 bg-green-500 text-white rounded-lg' }, h(Check, { className: 'w-4 h-4' })),
                    h('button', { onClick: () => setEditingId(null), className: 'p-2 bg-gray-300 rounded-lg' }, h(X, { className: 'w-4 h-4' }))
                  )
                : h('button', { onClick: () => { setEditingId(v.id); setEditTitle(v.title); }, className: 'p-2 text-blue-600 hover:bg-blue-50 rounded-lg' }, h(Edit3, { className: 'w-4 h-4' })),
              confirmDeleteId === v.id
                ? h('div', { className: 'flex items-center gap-1 bg-red-50 p-1 rounded-lg border border-red-200' },
                    h(AlertTriangle, { className: 'w-4 h-4 text-red-600' }),
                    h('button', { onClick: () => handleConfirmDelete(v.id, 'long'), className: 'px-2 py-1 bg-red-600 text-white text-xs font-bold rounded' }, 'HA'),
                    h('button', { onClick: () => setConfirmDeleteId(null), className: 'px-2 py-1 bg-gray-200 text-xs rounded' }, 'YO\'Q')
                  )
                : h('button', { onClick: () => setConfirmDeleteId(v.id), className: 'p-2 text-red-500 hover:bg-red-50 rounded-lg' }, h(Trash2, { className: 'w-4 h-4' }))
            )
          )
        )
      ),

      // RO'YXAT: Shorts Videolar
      h('div', { className: 'bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4' },
        h('h2', { className: 'text-lg font-bold text-gray-800' }, `Shorts Videolar (${shorts.length})`),
        shorts.map(s => 
          h('div', { key: s.id, className: 'flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 gap-4' },
            h('div', { className: 'flex items-center gap-3 flex-1 overflow-hidden' },
              h('img', { src: s.thumbnail || s.videoUrl, className: 'w-10 h-14 object-cover rounded-lg' }),
              h('div', { className: 'truncate' },
                h('h4', { className: 'text-sm font-semibold text-gray-900 truncate' }, s.title),
                h('p', { className: 'text-xs text-gray-500' }, s.channel)
              )
            ),
            h('button', { onClick: () => deleteShort(s.id), className: 'p-2 text-red-500 hover:bg-red-50 rounded-lg' }, h(Trash2, { className: 'w-4 h-4' }))
          )
        )
      )

    )
  );
}


export default Admin;