document.addEventListener("DOMContentLoaded", function () {
    const svg = document.querySelector('svg');
    const allPaths = document.querySelectorAll('svg path');
    const tooltip = document.getElementById('map-tooltip');

    function clearAll() {
        allPaths.forEach(p => p.classList.remove('active-region'));
        tooltip.style.display = 'none';
    }

    svg.addEventListener('mouseover', function (e) {
        const region = e.target.closest('path');
        if (!region) return;

        if (region.classList.contains('active-region')) return;

        allPaths.forEach(p => p.classList.remove('active-region'));

        if (region.parentNode.lastElementChild !== region) {
            region.parentNode.appendChild(region);
        }

        region.classList.add('active-region');

        const regionName = region.getAttribute('title');
        if (regionName) {
            tooltip.innerText = regionName;
            tooltip.style.display = 'block';
        }
    });

    svg.addEventListener('mousemove', function (e) {
        if (tooltip.style.display === 'block') {
            tooltip.style.left = (e.pageX + 15) + 'px';
            tooltip.style.top = (e.pageY + 15) + 'px';
        }
    });

    svg.addEventListener('mouseout', function (e) {
        const related = e.relatedTarget;
        if (!related || !e.target.contains(related)) {
            const region = e.target.closest('path');
            if (region) {}
        }
    });

    svg.addEventListener('mouseleave', clearAll);
});