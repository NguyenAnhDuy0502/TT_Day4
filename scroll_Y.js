function observeWithDelay(className, offset = 0, baseDelay = 200) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = offset + index * baseDelay;
        setTimeout(() => {
          entry.target.classList.add("show");
        }, delay);
      }
    });
  });

  document.querySelectorAll(`.${className}`).forEach((el) => {
    observer.observe(el);
  });
}

// -------------------------------------------------------------------------------------------------------------
observeWithDelay("CMS_logo__img");
observeWithDelay("demo_item", 0, 0);
