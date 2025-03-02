// Ждём полной загрузки DOM, чтобы элементы были доступны
document.addEventListener('DOMContentLoaded', function() {
    // Получаем ссылки на секции, пункты меню, кнопку меню и боковую панель
    const sections = document.querySelectorAll('.section');
    const menuLinks = document.querySelectorAll('.menu a');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
  
    // Функция показа выбранной секции по её ID
    function showSection(sectionId) {
      // Скрываем все секции
      sections.forEach(sec => sec.classList.remove('active'));
      // Убираем класс 'active' у всех пунктов меню
      menuLinks.forEach(link => link.classList.remove('active'));
      // Отображаем нужную секцию, добавляя ей класс 'active'
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
      // Подсвечиваем соответствующий пункт меню как активный
      const targetLink = document.querySelector('.menu a[data-target="' + sectionId + '"]');
      if (targetLink) {
        targetLink.classList.add('active');
      }
    }
  
    // Назначаем обработчик клика для каждого пункта меню
    menuLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Отменяем переход по ссылке
        const sectionId = this.getAttribute('data-target');
        showSection(sectionId);
        // Если боковое меню было открыто (на мобильном), закрываем его после выбора пункта
        if (sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
          menuToggle.textContent = '☰ Меню';
        }
      });
    });
  
    // Обработчик для кнопки-гамбургера (показывает/скрывает меню на мобильных)
    menuToggle.addEventListener('click', function() {
      const isOpen = sidebar.classList.toggle('open'); // переключаем состояние меню
      // Меняем текст кнопки в зависимости от состояния меню
      this.textContent = isOpen ? '✕ Закрыть' : '☰ Меню';
    });
  
    // Обработка раскрытия/сворачивания блоков в разделе "Цветовая палитра"
    const colorItems = document.querySelectorAll('.color-item');
    colorItems.forEach(item => {
      const nameDiv = item.querySelector('.color-name');
      const detailsDiv = item.querySelector('.color-details');
      // При клике на название цвета в списке
      nameDiv.addEventListener('click', function() {
        const isOpen = item.classList.contains('open');
        if (isOpen) {
          // Закрываем: убираем класс 'open' и сворачиваем блок (высота 0)
          item.classList.remove('open');
          detailsDiv.style.maxHeight = '0px';
        } else {
          // Открываем: добавляем класс 'open' для родителя
          item.classList.add('open');
          // Устанавливаем max-height для блока деталей, равной полной высоте контента, для плавного раскрытия
          detailsDiv.style.maxHeight = detailsDiv.scrollHeight + 'px';
        }
      });
    });
  });
  