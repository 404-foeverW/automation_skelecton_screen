<template>
    <div v-if="loading">__SKELETON_UserInfo_CONTENT__</div>
    <div v-else class="container">
        <!-- 左侧栏：个人信息 -->
        <aside>
            <div class="card profile-section">
                <!-- 头像 -->
                <img :src="profile.avatar" alt="Avatar" class="avatar">
                <h1 class="name">{{ profile.name }}</h1>
                <p class="job-title">{{ profile.jobTitle }}</p>
                
                <!-- 联系方式 -->
                <ul class="contact-list">
                    <li v-for="(item, index) in profile.contact" :key="index">
                        <span style="margin-right: 8px;">{{ item.icon }}</span>
                        {{ item.text }}
                    </li>
                </ul>
            </div>

            <!-- 技能栈 -->
            <div class="card">
                <h2 class="section-title">技能栈</h2>
                <div class="skill-tags">
                    <span v-for="skill in skills" :key="skill" class="tag">
                        <a href="">{{ skill }}</a>
                    </span>
                </div>
            </div>
        </aside>

        <!-- 右侧栏：详细信息 -->
        <main>
            <!-- 个人简介 -->
            <div class="card">
                <h2 class="section-title">个人简介</h2>
                <p style="color: var(--text-secondary);">{{ profile.summary }}</p>
            </div>

            <!-- 工作经历 -->
            <div class="card">
                <h2 class="section-title">工作经历</h2>
                <div class="experience-item" v-for="(job, index) in experience" :key="index">
                    <div class="exp-header">
                        <div>
                            <div class="exp-role">{{ job.role }}</div>
                            <div class="exp-company">{{ job.company }}</div>
                        </div>
                        <div class="exp-date">{{ job.date }}</div>
                    </div>
                    <p class="exp-desc">{{ job.description }}</p>
                </div>
            </div>

            <!-- 项目展示 -->
            <div class="card">
                <h2 class="section-title">项目展示</h2>
                <div class="experience-item" v-for="(project, index) in projects" :key="index">
                    <div class="exp-header">
                        <div class="exp-role">{{ project.name }}</div>
                        <a :href="project.link" style="color: var(--primary-color); text-decoration: none; font-size: 0.9rem;">查看项目 &rarr;</a>
                    </div>
                    <p class="exp-desc">{{ project.description }}</p>
                    <div class="skill-tags" style="margin-top: 10px;">
                        <span v-for="tag in project.tech" :key="tag" class="tag" style="font-size: 0.75rem;">{{ tag }}</span>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    name: 'UserInfo',
    data() {
        return {
            loading: true,
            profile: {
                name: '张三',
                jobTitle: '高级前端工程师',
                avatar: 'https://picsum.photos/seed/avatar1/200/200', // 随机头像
                summary: '拥有5年前端开发经验，热衷于Vue生态和现代化Web应用开发。具备良好的代码规范和团队协作能力，致力于编写高性能、可维护的代码。',
                contact: [
                    { icon: '📧', text: 'zhangsan@example.com' },
                    { icon: '📱', text: '138-0000-0000' },
                    { icon: '📍', text: '中国·北京' },
                    { icon: '🌐', text: 'github.com/zhangsan' }
                ]
            },
            skills: [
                'HTML5/CSS3', 'JavaScript (ES6+)', 'Vue.js', 'React', 
                'TypeScript', 'Node.js', 'Webpack/Vite', 'Git'
            ],
            experience: [
                {
                    role: '高级前端开发',
                    company: '某知名互联网科技公司',
                    date: '2021 - 至今',
                    description: '负责公司核心SaaS平台的前端架构设计与开发。主导了从Vue2到Vue3的迁移工作，提升了页面加载速度30%。'
                },
                {
                    role: '前端开发工程师',
                    company: '创新网络解决方案有限公司',
                    date: '2018 - 2021',
                    description: '参与电商小程序及H5活动页面的开发。负责组件库的搭建与维护，提高了团队开发效率。'
                }
            ],
            projects: [
                {
                    name: '企业级后台管理系统',
                    description: '基于Vue3 + Vite + TypeScript构建的通用后台管理模板，集成了权限管理、动态路由等功能。',
                    tech: ['Vue3', 'TypeScript', 'Element Plus'],
                    link: '#'
                },
                {
                    name: '数据可视化大屏',
                    description: '使用ECharts和Canvas实现的实时数据监控大屏，支持千万级数据渲染与交互。',
                    tech: ['Vue3', 'ECharts', 'WebSocket'],
                    link: '#'
                }
            ]
        }
    },
    mounted() {
        setTimeout(() => {
        this.loading = false;
        }, 5000);
    },
}
</script>
<style>
:root {
    --primary-color: #3b82f6; /* 主色调：蓝色 */
    --text-main: #1f2937;     /* 主要文字颜色 */
    --text-secondary: #4b5563;/* 次要文字颜色 */
    --bg-body: #f3f4f6;       /* 页面背景色 */
    --bg-card: #ffffff;       /* 卡片背景色 */
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --radius: 12px;
}

/* --- 基础重置 --- */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    background-color: var(--bg-body);
    color: var(--text-main);
    line-height: 1.6;
    padding: 20px;
}

/* --- 布局容器 --- */
.container {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 300px 1fr; /* 左侧边栏300px，右侧自适应 */
    gap: 24px;
}

/* --- 卡片通用样式 --- */
.card {
    background: var(--bg-card);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 24px;
    margin-bottom: 24px;
}

/* --- 左侧边栏 --- */
.profile-section {
    text-align: center;
}

.avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--primary-color);
    margin-bottom: 16px;
}

.name {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 8px;
}

.job-title {
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: 24px;
}

.contact-list {
    list-style: none;
    text-align: left;
}

.contact-list li {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

/* --- 右侧主要内容 --- */
.section-title {
    font-size: 1.25rem;
    border-bottom: 2px solid var(--bg-body);
    padding-bottom: 10px;
    margin-bottom: 20px;
    color: var(--text-main);
    display: flex;
    align-items: center;
}

.section-title::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 24px;
    background-color: var(--primary-color);
    margin-right: 10px;
    border-radius: 3px;
}

/* 技能标签 */
.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.tag {
    background-color: #eff6ff;
    color: var(--primary-color);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
}

/* 经历列表 */
.experience-item {
    margin-bottom: 24px;
    position: relative;
    padding-left: 20px;
    border-left: 2px solid #e5e7eb;
}

.experience-item::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 6px;
    width: 10px;
    height: 10px;
    background: var(--primary-color);
    border-radius: 50%;
}

.exp-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
}

.exp-role {
    font-weight: 700;
    font-size: 1.05rem;
}

.exp-company {
    color: var(--text-secondary);
    font-weight: 500;
}

.exp-date {
    font-size: 0.85rem;
    color: #9ca3af;
}

.exp-desc {
    margin-top: 8px;
    font-size: 0.95rem;
    color: var(--text-secondary);
}

/* --- 响应式设计 --- */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr; /* 手机端改为单列 */
    }
    .profile-section {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>