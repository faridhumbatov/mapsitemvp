document.addEventListener("DOMContentLoaded", function () {
    const svg = document.querySelector('svg');
    const allPaths = document.querySelectorAll('svg path');
    const tooltip = document.getElementById('map-tooltip');

    // Hər şeyi sıfırlayan funksiya
    function clearAll() {
        allPaths.forEach(p => p.classList.remove('active-region'));
        tooltip.style.display = 'none';
    }

    svg.addEventListener('mouseover', function (e) {
        const region = e.target.closest('path');

        if (region) {
            // 1. Sürətli keçidlərdə digər rayonları təmizləyirik
            clearAll();

            // 2. Elementi ən üst qata çıxarırıq
            if (region !== region.parentNode.lastElementChild) {
                region.parentNode.appendChild(region);
            }

            // 3. Rayonu aktiv edirik (böyüyür və rəngi dəyişir)
            region.classList.add('active-region');

            // 4. Tooltip-də adı göstəririk
            const regionName = region.getAttribute('title');
            if (regionName) {
                tooltip.innerText = regionName;
                tooltip.style.display = 'block';
            }
        }
    });

    svg.addEventListener('mousemove', function (e) {
        // Tooltip-in siçanı təqib etməsi üçün
        if (tooltip.style.display === 'block') {
            tooltip.style.left = (e.pageX + 15) + 'px';
            tooltip.style.top = (e.pageY + 15) + 'px';
        }
    });

    svg.addEventListener('mouseout', function (e) {
        const region = e.target.closest('path');
        if (region) {
            region.classList.remove('active-region');
            tooltip.style.display = 'none';
        }
    });

    // Maus xəritənin sərhədindən çıxanda hər şeyi sıfırla
    svg.addEventListener('mouseleave', clearAll);
});