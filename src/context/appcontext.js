import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Long videolar state'i
  const [videos, setVideos] = useState(() => {
    const savedVideos = localStorage.getItem('youtube_videos');
    if (savedVideos) {
      try { return JSON.parse(savedVideos); } catch (e) { console.error(e); }
    }
    return [
      {
        id: '1',
        title: 'React JS darslari - 1-qism: Kirish va JSX',
        channel: 'Code Master',
        views: '125K views',
        time: '2 days ago',
        category: 'Coding',
        hashtag: '#coding',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60'
      },
      {
        id: '2',
        title: 'PUBG Mobile - Yangi mavsum gameplay #gaming',
        channel: 'Orolboy Gaming',
        views: '85K views',
        time: '1 day ago',
        category: 'Gaming',
        hashtag: '#gaming',
        duration: '18:42',
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: '3',
        title: 'Sayohat kundaligi: Samarqandning eng go‘zal joylari',
        channel: 'Orolboy Dev',
        views: '24K views',
        time: '3 days ago',
        category: 'Travel',
        hashtag: '#travel',
        duration: '12:08',
        thumbnail: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=80'
      }
    ];
  });

  // Shorts videolar state'i
  const [shorts, setShorts] = useState(() => {
    const savedShorts = localStorage.getItem('youtube_shorts');
    if (savedShorts) {
      try { return JSON.parse(savedShorts); } catch (e) { console.error(e); }
    }
    return [
      {
        id: '101',
        title: 'React.js vs Next.js — Farqlari 🚀',
        channel: 'Code Master',
        likes: '45.2K',
        comments: '1.2K',
        videoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60'
      },
      {
        id: '102',
        title: 'Tailwind CSS tezkor qo\'llanma 🎨',
        channel: 'Web Dev Uz',
        likes: '12.8K',
        comments: '430',
        videoUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60'
      },
      {
        id: '103',
        title: 'Samarqand bo‘ylab bir kunlik sayohat',
        channel: 'Orolboy Dev',
        likes: '3.2K',
        comments: '86',
        videoUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=500&auto=format&fit=crop&q=60'
      },
      {
        id: '104',
        title: 'Bugungi o‘yinlardan eng yaxshi lavhalar',
        channel: 'Orolboy Gaming',
        likes: '8.1K',
        comments: '214',
        videoUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60'
      },
      {
        id: '105',
        title: 'Kreativ dasturlash va yangi g‘oyalar',
        channel: 'Code Master',
        likes: '1.7K',
        comments: '39',
        videoUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60'
      }
    ];
  });

  const [currentUserId] = useState(() => {
    const savedUserId = localStorage.getItem('youtube_user_id');
    if (savedUserId) return savedUserId;

    const userId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem('youtube_user_id', userId);
    return userId;
  });

  const [channelProfile, setChannelProfile] = useState(() => {
    const savedProfile = localStorage.getItem('youtube_channel_profile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        if (parsedProfile && typeof parsedProfile === 'object') {
          return {
            name: parsedProfile.name || 'Orolboy Dev',
            bio: parsedProfile.bio || '',
            banner: parsedProfile.banner || '',
            avatar: parsedProfile.avatar || ''
          };
        }
        console.error('Saved channel profile has an invalid format.');
      } catch (e) {
        console.error(e);
      }
    }
    return { name: 'Orolboy Dev', bio: '', banner: '', avatar: '' };
  });

  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem('youtube_video_comments');
    if (savedComments) {
      try {
        const parsedComments = JSON.parse(savedComments);
        if (parsedComments && typeof parsedComments === 'object' && !Array.isArray(parsedComments)) {
          return Object.entries(parsedComments).reduce((saved, [videoId, videoComments]) => {
            saved[videoId] = Array.isArray(videoComments)
              ? videoComments.map((comment) => ({
                  ...comment,
                  authorId: comment.authorId || currentUserId
                }))
              : [];
            return saved;
          }, {});
        }
        console.error('Saved video comments have an invalid format.');
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  const [videoReactions, setVideoReactions] = useState(() => {
    const savedReactions = localStorage.getItem('youtube_video_reactions');
    if (savedReactions) {
      try {
        const parsedReactions = JSON.parse(savedReactions);
        if (parsedReactions && typeof parsedReactions === 'object' && !Array.isArray(parsedReactions)) {
          return parsedReactions;
        }
        console.error('Saved video reactions have an invalid format.');
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  const [watchHistory, setWatchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('youtube_watch_history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) return parsedHistory;
        console.error('Saved watch history has an invalid format.');
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('youtube_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('youtube_shorts', JSON.stringify(shorts));
  }, [shorts]);

  useEffect(() => {
    localStorage.setItem('youtube_video_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('youtube_video_reactions', JSON.stringify(videoReactions));
  }, [videoReactions]);

  useEffect(() => {
    localStorage.setItem('youtube_channel_profile', JSON.stringify(channelProfile));
  }, [channelProfile]);

  useEffect(() => {
    localStorage.setItem('youtube_watch_history', JSON.stringify(watchHistory));
  }, [watchHistory]);

  const [subscriptions, setSubscriptions] = useState(() => {
    const savedSubscriptions = localStorage.getItem('youtube_subscriptions');
    if (savedSubscriptions) {
      try {
        const parsedSubscriptions = JSON.parse(savedSubscriptions);
        if (Array.isArray(parsedSubscriptions)) return parsedSubscriptions;
        console.error('Saved subscriptions have an invalid format.');
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: 'Code Master', name: 'Code Master', avatar: 'C' },
      { id: 'Web Dev Uz', name: 'Web Dev Uz', avatar: 'W' },
      { id: 'Qsport Uzbekistan', name: 'Qsport Uzbekistan', avatar: 'Q' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('youtube_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const addVideo = (newVideo) => setVideos((currentVideos) => [newVideo, ...currentVideos]);
  const deleteVideo = (id) => setVideos((currentVideos) => currentVideos.filter(v => v.id !== id));
  const updateVideoTitle = (id, newTitle) => setVideos((currentVideos) =>
    currentVideos.map(v => v.id === id ? { ...v, title: newTitle } : v)
  );
  const updateChannelProfile = (changes) => setChannelProfile((profile) => ({ ...profile, ...changes }));
  const recordWatchedVideo = useCallback((videoId) => setWatchHistory((history) => {
    if (history[0] === videoId) return history;
    return [videoId, ...history.filter((savedVideoId) => savedVideoId !== videoId)].slice(0, 100);
  }), []);
  const toggleSubscription = (channelName) => {
    if (!channelName || channelName === channelProfile.name) return;
    setSubscriptions((currentSubscriptions) => currentSubscriptions.some((sub) => sub.name === channelName)
      ? currentSubscriptions.filter((sub) => sub.name !== channelName)
      : [...currentSubscriptions, {
          id: channelName,
          name: channelName,
          avatar: channelName.charAt(0).toUpperCase()
        }]
    );
  };

  // Shorts qo'shish va o'chirish
  const addShort = (newShort) => setShorts((currentShorts) => [newShort, ...currentShorts]);
  const deleteShort = (id) => setShorts((currentShorts) => currentShorts.filter(s => s.id !== id));
  const addComment = (videoId, text) => {
    const comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      text,
      createdAt: new Date().toISOString(),
      authorId: currentUserId
    };
    setComments((currentComments) => ({
      ...currentComments,
      [videoId]: [...(Array.isArray(currentComments[videoId]) ? currentComments[videoId] : []), comment]
    }));
  };
  const updateComment = (videoId, commentId, text) => {
    setComments((currentComments) => ({
      ...currentComments,
      [videoId]: (currentComments[videoId] || []).map((comment) =>
        comment.id === commentId && comment.authorId === currentUserId
          ? { ...comment, text, updatedAt: new Date().toISOString() }
          : comment
      )
    }));
  };
  const deleteComment = (videoId, commentId) => {
    setComments((currentComments) => ({
      ...currentComments,
      [videoId]: (currentComments[videoId] || []).filter((comment) =>
        comment.id !== commentId || comment.authorId !== currentUserId
      )
    }));
  };
  const setVideoReaction = (videoId, reactionType) => {
    if (reactionType !== 'like' && reactionType !== 'dislike') return;

    setVideoReactions((currentReactions) => {
      const votes = Array.isArray(currentReactions[videoId]) ? currentReactions[videoId] : [];
      const existingVote = votes.find((vote) => vote.userId === currentUserId);
      const otherVotes = votes.filter((vote) => vote.userId !== currentUserId);

      return {
        ...currentReactions,
        [videoId]: existingVote && existingVote.type === reactionType
          ? otherVotes
          : [...otherVotes, { userId: currentUserId, type: reactionType }]
      };
    });
  };

  return React.createElement(
    AppContext.Provider,
    { 
      value: { 
        isSidebarOpen, 
        toggleSidebar, 
        selectedCategory, 
        setSelectedCategory, 
        videos, 
        addVideo, 
        deleteVideo, 
        updateVideoTitle, 
        shorts, 
        addShort, 
        deleteShort, 
        comments,
        addComment,
        updateComment,
        deleteComment,
        currentUserId,
        videoReactions,
        setVideoReaction,
        subscriptions,
        toggleSubscription,
        channelProfile,
        updateChannelProfile,
        watchHistory,
        recordWatchedVideo
      } 
    },
    children
  );
}