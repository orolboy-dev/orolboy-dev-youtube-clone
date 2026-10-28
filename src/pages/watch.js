import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { AppContext } from '../context/appcontext.js';

const h = React.createElement;

const isVideoFile = (url) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url || '');

function Watch() {
  const { id } = useParams();
  const {
    videos,
    comments,
    addComment,
    updateComment,
    deleteComment,
    currentUserId,
    videoReactions,
    setVideoReaction,
    recordWatchedVideo
  } = useContext(AppContext);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const currentVideo = videos.find((video) => String(video.id) === id);
  const recommendations = videos.filter((video) => String(video.id) !== id);
  const videoComments = Array.isArray(comments[id]) ? comments[id] : [];
  const reactions = Array.isArray(videoReactions[id]) ? videoReactions[id] : [];
  const currentReaction = reactions.find((reaction) => reaction.userId === currentUserId);
  const likeCount = reactions.filter((reaction) => reaction.type === 'like').length;
  const dislikeCount = reactions.filter((reaction) => reaction.type === 'dislike').length;

  useEffect(() => {
    if (currentVideo) recordWatchedVideo(String(currentVideo.id));
  }, [currentVideo, recordWatchedVideo]);

  const handleAddComment = (event) => {
    event.preventDefault();
    const text = commentText.trim();
    if (!text) return;

    addComment(id, text);
    setCommentText('');
  };

  const handleSaveComment = (commentId) => {
    const text = editingCommentText.trim();
    if (!text) return;

    updateComment(id, commentId, text);
    setEditingCommentId(null);
    setEditingCommentText('');
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(id, commentId);
    setConfirmDeleteId(null);
    if (editingCommentId === commentId) {
      setEditingCommentId(null);
      setEditingCommentText('');
    }
  };

  if (!currentVideo) {
    return h('main', { className: 'flex-1 min-w-0 p-8 text-center' },
      h('h1', { className: 'text-xl font-semibold text-gray-900' }, 'Video topilmadi'),
      h(Link, { to: '/', className: 'inline-block mt-3 text-sm text-blue-600 hover:underline' }, 'Bosh sahifaga qaytish')
    );
  }

  return h('main', { className: 'flex-1 min-w-0 h-[calc(100vh-56px)] overflow-y-auto bg-white' },
    h('div', { className: 'flex flex-col xl:flex-row gap-6 p-4 md:p-6 max-w-[1800px] mx-auto' },
      h('section', { className: 'flex-1 min-w-0' },
        h('div', { className: 'aspect-video bg-black rounded-xl overflow-hidden' },
          isVideoFile(currentVideo.videoUrl)
            ? h('video', {
                src: currentVideo.videoUrl,
                poster: currentVideo.thumbnail,
                controls: true,
                autoPlay: true,
                playsInline: true,
                className: 'w-full h-full'
              })
            : h('img', {
                src: currentVideo.thumbnail,
                alt: currentVideo.title,
                className: 'w-full h-full object-contain'
              })
        ),
        h('h1', { className: 'mt-4 text-lg md:text-xl font-bold text-gray-900' }, currentVideo.title),
        h('div', { className: 'mt-3 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4' },
          h('div', { className: 'flex items-center gap-3' },
            h('div', { className: 'w-10 h-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center' },
              (currentVideo.channel || 'U').charAt(0).toUpperCase()
            ),
            h('div', null,
              h('p', { className: 'text-sm font-semibold text-gray-900' }, currentVideo.channel || 'Kanal'),
              h('p', { className: 'text-xs text-gray-500' }, `${currentVideo.views || '0 views'} • ${currentVideo.time || 'Just now'}`)
            )
          ),
          h('div', { className: 'flex items-center gap-2' },
            currentVideo.category && h('span', { className: 'px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700' }, currentVideo.category),
            h('div', { className: 'flex items-center bg-gray-100 rounded-full p-1' },
              h('button', {
                type: 'button',
                onClick: () => setVideoReaction(id, 'like'),
                'aria-label': 'Yoqdi',
                'aria-pressed': Boolean(currentReaction && currentReaction.type === 'like'),
                className: `flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors ${
                  currentReaction && currentReaction.type === 'like'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              },
                h(ThumbsUp, { className: 'w-4 h-4' }),
                h('span', null, likeCount)
              ),
              h('span', { className: 'w-px h-5 bg-gray-300' }),
              h('button', {
                type: 'button',
                onClick: () => setVideoReaction(id, 'dislike'),
                'aria-label': 'Yoqmadi',
                'aria-pressed': Boolean(currentReaction && currentReaction.type === 'dislike'),
                className: `flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors ${
                  currentReaction && currentReaction.type === 'dislike'
                    ? 'bg-gray-300 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-200'
                }`
              },
                h(ThumbsDown, { className: 'w-4 h-4' }),
                h('span', null, dislikeCount)
              )
            )
          )
        ),
        h('section', { className: 'mt-6' },
          h('h2', { className: 'text-lg font-bold text-gray-900' }, `Izohlar (${videoComments.length})`),
          h('form', { onSubmit: handleAddComment, className: 'mt-4 flex gap-3 items-start' },
            h('div', { className: 'w-9 h-9 rounded-full bg-gray-200 text-gray-700 font-semibold flex items-center justify-center flex-shrink-0' }, 'S'),
            h('div', { className: 'flex-1 min-w-0' },
              h('textarea', {
                value: commentText,
                onChange: (event) => setCommentText(event.target.value),
                placeholder: 'Izoh yozing...',
                rows: 2,
                maxLength: 1000,
                required: true,
                className: 'w-full resize-y border-b border-gray-300 focus:border-gray-900 outline-none py-2 text-sm'
              }),
              h('div', { className: 'flex justify-end gap-2 mt-2' },
                h('button', {
                  type: 'button',
                  onClick: () => setCommentText(''),
                  disabled: !commentText,
                  className: 'px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50'
                }, 'Bekor qilish'),
                h('button', {
                  type: 'submit',
                  disabled: !commentText.trim(),
                  className: 'px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                }, 'Izoh qoldirish')
              )
            )
          ),
          videoComments.length > 0
            ? h('div', { className: 'mt-6 flex flex-col gap-5' },
                [...videoComments].reverse().map((comment) =>
                  h('article', { key: comment.id, className: 'flex gap-3 items-start' },
                    h('div', { className: 'w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center flex-shrink-0' }, 'S'),
                    h('div', { className: 'min-w-0' },
                      h('div', { className: 'flex flex-wrap items-center gap-2' },
                        h('span', { className: 'text-sm font-semibold text-gray-900' }, 'Foydalanuvchi'),
                        h('time', { className: 'text-xs text-gray-500' }, new Date(comment.updatedAt || comment.createdAt).toLocaleString()),
                        comment.updatedAt && h('span', { className: 'text-xs text-gray-500' }, '(tahrirlangan)')
                      ),
                      editingCommentId === comment.id
                        ? h('div', { className: 'mt-2' },
                            h('textarea', {
                              value: editingCommentText,
                              onChange: (event) => setEditingCommentText(event.target.value),
                              rows: 3,
                              maxLength: 1000,
                              className: 'w-full resize-y border-b border-gray-300 focus:border-gray-900 outline-none py-2 text-sm'
                            }),
                            h('div', { className: 'flex justify-end gap-2 mt-2' },
                              h('button', {
                                type: 'button',
                                onClick: () => {
                                  setEditingCommentId(null);
                                  setEditingCommentText('');
                                },
                                className: 'px-3 py-1.5 rounded-full text-sm text-gray-700 hover:bg-gray-100'
                              }, 'Bekor qilish'),
                              h('button', {
                                type: 'button',
                                onClick: () => handleSaveComment(comment.id),
                                disabled: !editingCommentText.trim(),
                                className: 'px-3 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
                              }, 'Saqlash')
                            )
                          )
                        : h('p', { className: 'mt-1 text-sm text-gray-800 whitespace-pre-wrap break-words' }, comment.text),
                      comment.authorId === currentUserId && editingCommentId !== comment.id && h('div', { className: 'flex gap-3 mt-2' },
                        h('button', {
                          type: 'button',
                          onClick: () => {
                            setEditingCommentId(comment.id);
                            setEditingCommentText(comment.text);
                            setConfirmDeleteId(null);
                          },
                          className: 'text-xs font-medium text-gray-600 hover:text-blue-700'
                        }, 'Tahrirlash'),
                        confirmDeleteId === comment.id
                          ? h(React.Fragment, null,
                              h('span', { className: 'text-xs text-gray-600' }, 'O‘chirilsinmi?'),
                              h('button', {
                                type: 'button',
                                onClick: () => handleDeleteComment(comment.id),
                                className: 'text-xs font-medium text-red-600 hover:text-red-700'
                              }, 'Ha, o‘chirish'),
                              h('button', {
                                type: 'button',
                                onClick: () => setConfirmDeleteId(null),
                                className: 'text-xs text-gray-600 hover:text-gray-900'
                              }, 'Bekor qilish')
                            )
                          : h('button', {
                              type: 'button',
                              onClick: () => setConfirmDeleteId(comment.id),
                              className: 'text-xs font-medium text-gray-600 hover:text-red-600'
                            }, 'O‘chirish')
                      )
                    )
                  )
                )
              )
            : h('p', { className: 'mt-6 text-sm text-gray-500' }, 'Hozircha izohlar yo‘q. Birinchi bo‘lib izoh yozing!')
        )
      ),
      h('aside', { className: 'w-full xl:w-[380px] 2xl:w-[420px] flex-shrink-0' },
        h('h2', { className: 'mb-3 text-base font-semibold text-gray-900' }, 'Tavsiya etilgan videolar'),
        recommendations.length > 0
          ? h('div', { className: 'flex flex-col gap-3' },
              recommendations.map((video) =>
                h(Link, {
                  key: video.id,
                  to: `/watch/${video.id}`,
                  className: 'flex gap-3 group rounded-lg hover:bg-gray-50 p-1 transition-colors'
                },
                  h('div', { className: 'w-40 sm:w-44 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-gray-100' },
                    h('img', {
                      src: video.thumbnail,
                      alt: video.title,
                      className: 'w-full h-full object-cover'
                    })
                  ),
                  h('div', { className: 'min-w-0 py-0.5' },
                    h('h3', { className: 'text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700' }, video.title),
                    h('p', { className: 'mt-1 text-xs text-gray-600 truncate' }, video.channel || 'Kanal'),
                    h('p', { className: 'mt-1 text-xs text-gray-500' }, `${video.views || '0 views'} • ${video.time || 'Just now'}`)
                  )
                )
              )
            )
          : h('p', { className: 'text-sm text-gray-500 bg-gray-50 rounded-lg p-4' }, 'Hozircha boshqa videolar mavjud emas.')
      )
    )
  );
}

export default Watch;