<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ReaderscOrnerPoint - Social Story Platform</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --primary-color: #4f46e5;
            --primary-hover: #4338ca;
            --bg-color: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border-color: #e2e8f0;
            --radius: 12px;
            --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background-color: var(--bg-color); color: var(--text-main); line-height: 1.6; }

        header { background: var(--card-bg); border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 100; }
        .navbar { max-width: 1200px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: 700; color: var(--primary-color); text-decoration: none; display: flex; align-items: center; gap: 8px; }
        .nav-links { display: flex; align-items: center; gap: 1rem; }

        .btn { padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 500; cursor: pointer; transition: 0.2s; border: none; font-size: 0.95rem; }
        .btn-outline { background: transparent; color: var(--text-main); border: 1px solid var(--border-color); }
        .btn-outline:hover { background: #f1f5f9; }
        .btn-primary { background-color: var(--primary-color); color: white; }
        .btn-primary:hover { background-color: var(--primary-hover); }

        .hero { text-align: center; padding: 3.5rem 1rem 1.5rem; max-width: 800px; margin: 0 auto; }
        .hero h1 { font-family: 'Merriweather', serif; font-size: 2.5rem; margin-bottom: 0.8rem; }
        .hero p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 1.5rem; }

        .container { max-width: 1200px; margin: 1.5rem auto; padding: 0 1.5rem; display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
        
        .post-card { background: var(--card-bg); border-radius: var(--radius); padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: var(--shadow); border: 1px solid var(--border-color); }
        .post-author { display: flex; align-items: center; gap: 10px; margin-bottom: 0.8rem; }
        .author-avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .post-title { font-family: 'Merriweather', serif; font-size: 1.3rem; margin-bottom: 0.5rem; cursor: pointer; }
        .post-title:hover { color: var(--primary-color); }
        .post-excerpt { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem; }
        .post-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.8rem; }
        
        .tag { background: #f1f5f9; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
        .action-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 0.9rem; }
        .action-btn.liked { color: #e11d48; }

        .sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
        .widget { background: var(--card-bg); border-radius: var(--radius); padding: 1.2rem; border: 1px solid var(--border-color); }
        
        /* Modal Popup */
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(4px); z-index: 1000; justify-content: center; align-items: center; }
        .modal-content { background: var(--card-bg); width: 100%; max-width: 550px; padding: 2rem; border-radius: var(--radius); position: relative; max-height: 90vh; overflow-y: auto; }
        .close-btn { position: absolute; top: 15px; right: 20px; font-size: 1.4rem; cursor: pointer; }

        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; font-size: 0.85rem; margin-bottom: 0.3rem; font-weight: 500; }
        .form-group input, .form-group textarea { width: 100%; padding: 0.7rem; border: 1px solid var(--border-color); border-radius: 6px; font-family: inherit; }

        /* Comments styling */
        .comments-section { margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem; }
        .comment-item { background: #f8fafc; padding: 0.8rem; border-radius: 8px; margin-bottom: 0.8rem; }
        .comment-author { font-weight: 600; font-size: 0.85rem; }
        .comment-date { font-size: 0.75rem; color: var(--text-muted); }

        @media(max-width: 768px) { .container { grid-template-columns: 1fr; } }
    </style>
</head>
<body>

    <header>
        <div class="navbar">
            <a href="#" class="logo"><i class="fa-solid fa-book-open-reader"></i> ReaderscOrnerPoint</a>
            <div class="nav-links" id="authNav"></div>
        </div>
    </header>

    <section class="hero">
        <h1>Where Great Stories Find Their Voice.</h1>
        <p>Read, publish, and engage with personal stories from around the world.</p>
        <button class="btn btn-primary" onclick="openCreatePostModal()"><i class="fa-solid fa-pen"></i> Share Your Story</button>
    </section>

    <div class="container">
        <main>
            <h2 style="margin-bottom: 1rem;">Trending Stories</h2>
            <div id="postsContainer">Loading stories...</div>
        </main>
        
        <aside class="sidebar">
            <div class="widget">
                <h3>Explore Topics</h3>
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:0.8rem;">
                    <span class="tag">Life</span>
                    <span class="tag">Technology</span>
                    <span class="tag">Travel</span>
                    <span class="tag">Culture</span>
                </div>
            </div>
        </aside>
    </div>

    <!-- Auth Modal -->
    <div class="modal" id="authModal">
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal('authModal')">&times;</span>
            <h2 id="authTitle" style="margin-bottom: 1rem;">Log In</h2>
            <form id="authForm" onsubmit="handleAuthSubmit(event)">
                <div class="form-group" id="nameGroup" style="display:none;">
                    <label>Full Name</label>
                    <input type="text" id="authName" placeholder="John Doe">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="authEmail" required placeholder="you@example.com">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" id="authPassword" required placeholder="••••••••">
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%;" id="authBtn">Submit</button>
            </form>
        </div>
    </div>

    <!-- Create Post Modal -->
    <div class="modal" id="postModal">
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal('postModal')">&times;</span>
            <h2 style="margin-bottom: 1rem;">Share Your Story</h2>
            <form onsubmit="handlePostSubmit(event)">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="postTitle" required placeholder="Title of your story...">
                </div>
                <div class="form-group">
                    <label>Topic Tag</label>
                    <input type="text" id="postTag" required placeholder="e.g. Life, Travel, Tech">
                </div>
                <div class="form-group">
                    <label>Story Content</label>
                    <textarea id="postContent" rows="6" required placeholder="Write your full story here..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%;">Publish Story</button>
            </form>
        </div>
    </div>

    <!-- Story View & Comment Modal -->
    <div class="modal" id="viewModal">
        <div class="modal-content" style="max-width: 650px;">
            <span class="close-btn" onclick="closeModal('viewModal')">&times;</span>
            <div id="storyViewDetail"></div>
        </div>
    </div>

    <script>
        const API_URL = '/api';
        let currentUser = JSON.parse(localStorage.getItem('user')) || null;
        let token = localStorage.getItem('token') || null;
        let isSignup = false;

        function updateNav() {
            const nav = document.getElementById('authNav');
            if (currentUser) {
                nav.innerHTML = `
                    <span style="font-weight:600;">👋 ${currentUser.name}</span>
                    <button class="btn btn-outline" onclick="logout()">Log Out</button>
                `;
            } else {
                nav.innerHTML = `
                    <button class="btn btn-outline" onclick="openAuthModal(false)">Log In</button>
                    <button class="btn btn-primary" onclick="openAuthModal(true)">Sign Up</button>
                `;
            }
        }

        async function fetchPosts() {
            const res = await fetch(`${API_URL}/posts`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            const posts = await res.json();
            
            const container = document.getElementById('postsContainer');
            container.innerHTML = posts.length ? '' : '<p>No stories published yet. Be the first!</p>';

            posts.forEach(post => {
                const excerpt = post.content.length > 130 ? post.content.substring(0, 130) + '...' : post.content;
                const card = document.createElement('article');
                card.className = 'post-card';
                card.innerHTML = `
                    <div class="post-author">
                        <div class="author-avatar">${post.author.charAt(0).toUpperCase()}</div>
                        <div>
                            <strong>${post.author}</strong>
                            <div style="font-size:0.75rem; color:var(--text-muted);">${new Date(post.created_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div class="post-title" onclick="openStoryView(${post.id}, \`${encodeURIComponent(JSON.stringify(post))\`)">${post.title}</div>
                    <p class="post-excerpt">${excerpt}</p>
                    <div class="post-footer">
                        <span class="tag">${post.tag}</span>
                        <div style="display:flex; gap:1.2rem;">
                            <button class="action-btn ${post.is_liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                                <i class="${post.is_liked ? 'fa-solid' : 'fa-regular'} fa-heart"></i> ${post.likes_count}
                            </button>
                            <button class="action-btn" onclick="openStoryView(${post.id}, \`${encodeURIComponent(JSON.stringify(post))\`)">
                                <i class="fa-regular fa-comment"></i> ${post.comments_count}
                            </button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        async function toggleLike(postId) {
            if (!token) return alert('Please log in to like stories.');
            await fetch(`${API_URL}/posts/${postId}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchPosts();
        }

        async function openStoryView(postId, rawPostData) {
            const post = JSON.parse(decodeURIComponent(rawPostData));
            const res = await fetch(`${API_URL}/posts/${postId}/comments`);
            const comments = await res.json();

            const detail = document.getElementById('storyViewDetail');
            detail.innerHTML = `
                <h2>${post.title}</h2>
                <div style="color:var(--text-muted); font-size:0.85rem; margin: 0.5rem 0 1rem;">By ${post.author} • ${new Date(post.created_at).toLocaleDateString()}</div>
                <span class="tag">${post.tag}</span>
                <p style="white-space: pre-line; margin-top: 1rem; line-height: 1.8;">${post.content}</p>
                
                <div class="comments-section">
                    <h3>Comments (${comments.length})</h3>
                    ${currentUser ? `
                        <div style="display:flex; gap:8px; margin: 1rem 0;">
                            <input type="text" id="newCommentInput" placeholder="Add a comment..." style="flex:1; padding:0.6rem; border:1px solid var(--border-color); border-radius:6px;">
                            <button class="btn btn-primary" onclick="submitComment(${postId}, \`${rawPostData}\`)">Post</button>
                        </div>
                    ` : '<p style="font-size:0.85rem; color:var(--text-muted); margin: 0.8rem 0;">Log in to join the discussion.</p>'}
                    
                    <div id="commentsList">
                        ${comments.map(c => `
                            <div class="comment-item">
                                <div class="comment-author">${c.author} <span class="comment-date">${new Date(c.created_at).toLocaleDateString()}</span></div>
                                <div>${c.content}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            document.getElementById('viewModal').style.display = 'flex';
        }

        async function submitComment(postId, rawPostData) {
            const input = document.getElementById('newCommentInput');
            if (!input.value.trim()) return;

            await fetch(`${API_URL}/posts/${postId}/comments`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ content: input.value })
            });
            
            openStoryView(postId, rawPostData);
            fetchPosts();
        }

        function openAuthModal(signupState) {
            isSignup = signupState;
            document.getElementById('authTitle').innerText = isSignup ? 'Create Account' : 'Log In';
            document.getElementById('authBtn').innerText = isSignup ? 'Sign Up' : 'Log In';
            document.getElementById('nameGroup').style.display = isSignup ? 'block' : 'none';
            document.getElementById('authModal').style.display = 'flex';
        }

        async function handleAuthSubmit(e) {
            e.preventDefault();
            const email = document.getElementById('authEmail').value;
            const password = document.getElementById('authPassword').value;
            const name = document.getElementById('authName').value;

            const endpoint = isSignup ? '/auth/signup' : '/auth/login';
            const payload = isSignup ? { name, email, password } : { email, password };

            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (res.ok) {
                token = data.token;
                currentUser = data.user;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(currentUser));
                updateNav();
                closeModal('authModal');
                fetchPosts();
            } else {
                alert(data.error);
            }
        }

        function logout() {
            localStorage.clear();
            currentUser = null;
            token = null;
            updateNav();
            fetchPosts();
        }

        function openCreatePostModal() {
            if (!currentUser) return alert('Please log in to publish stories.');
            document.getElementById('postModal').style.display = 'flex';
        }

        async function handlePostSubmit(e) {
            e.preventDefault();
            const title = document.getElementById('postTitle').value;
            const tag = document.getElementById('postTag').value;
            const content = document.getElementById('postContent').value;

            const res = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, tag, content })
            });

            if (res.ok) {
                closeModal('postModal');
                document.getElementById('postTitle').value = '';
                document.getElementById('postTag').value = '';
                document.getElementById('postContent').value = '';
                fetchPosts();
            } else {
                alert('Failed to publish story.');
            }
        }

        function closeModal(id) { document.getElementById(id).style.display = 'none'; }

        // Initial Initialization
        updateNav();
        fetchPosts();
    </script>
</body>
</html>
