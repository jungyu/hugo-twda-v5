// 調試用主題切換腳本
console.log('Theme debug script loaded');

// 等待 DOM 完全加載
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing theme system...');
    
    // 檢查 Alpine.js 是否載入
    if (typeof Alpine === 'undefined') {
        console.error('Alpine.js is not loaded!');
        return;
    }
    
    // 檢查 DaisyUI 主題
    const availableThemes = ['light', 'dark', 'cupcake', 'dracula', 'autumn', 'emerald'];
    console.log('Available themes:', availableThemes);
    
    // 設置初始主題
    const initialTheme = localStorage.getItem('theme') || 'light';
    console.log('Initial theme:', initialTheme);
    
    // 立即設置主題
    setTheme(initialTheme);
    
    // 為所有 theme-controller 元素添加事件監聽
    const themeControllers = document.querySelectorAll('.theme-controller');
    console.log('Found theme controllers:', themeControllers.length);
    
    themeControllers.forEach((controller, index) => {
        console.log(`Theme controller ${index}:`, controller.value);
        
        controller.addEventListener('change', function(e) {
            if (e.target.checked) {
                console.log('Theme changed to:', e.target.value);
                setTheme(e.target.value);
            }
        });
    });
    
    // 主題設置函數
    function setTheme(theme) {
        console.log('Setting theme to:', theme);
        
        // 更新 HTML data-theme 屬性
        document.documentElement.setAttribute('data-theme', theme);
        
        // 更新 body class（用於 Tailwind 暗色模式）
        if (theme === 'dark' || theme === 'dracula') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        
        // 保存到 localStorage
        localStorage.setItem('theme', theme);
        
        // 更新相應的 theme-controller 狀態
        document.querySelectorAll('.theme-controller').forEach(controller => {
            controller.checked = controller.value === theme;
        });
        
        // 如果有 Alpine.js 組件，也同步更新
        if (window.Alpine && window.Alpine.store) {
            try {
                const store = window.Alpine.store('theme');
                if (store && store.setTheme) {
                    store.setTheme(theme);
                }
            } catch (err) {
                console.warn('Alpine store not available:', err);
            }
        }
        
        console.log('Theme applied successfully');
    }
    
    // 全局暴露設置主題函數（用於調試）
    window.setTheme = setTheme;
    
    console.log('Theme system initialized');
});

// 調試函數
window.debugTheme = function() {
    console.log('=== Theme Debug Info ===');
    console.log('Current data-theme:', document.documentElement.getAttribute('data-theme'));
    console.log('LocalStorage theme:', localStorage.getItem('theme'));
    console.log('Body classes:', document.body.className);
    console.log('Theme controllers:', document.querySelectorAll('.theme-controller').length);
    
    // 測試每個主題控制器
    document.querySelectorAll('.theme-controller').forEach((controller, index) => {
        console.log(`Controller ${index}:`, {
            value: controller.value,
            checked: controller.checked,
            name: controller.name
        });
    });
};
