/*
<slide-show> web component
*/
class SlideShow extends HTMLElement {

  // initialise
  connectedCallback() {

    // get slides
    this.item = Array.from( this.children );
    this.itemLen = this.item.length;
    if (!this.itemLen) return;

    // scroll first slide into view
    this.current = 0;

    // component in viewport?
    this.inView = false;
    const observer = new IntersectionObserver(entries => {
      this.inView = (entries[0].intersectionRatio === 1);
    }, {
      threshold: 1
    });
    observer.observe(this);

    // pause on over
    this.addEventListener('pointerover', () => this.pause = true);
    this.addEventListener('pointerout', () => this.pause = false);

    // autoscroll
    this.autoScroll = setInterval(() => this.#showSlide(1), 4000);

  }


  // scroll a slide into view
  #showSlide(inc = 0) {

    if (this.pause || !this.inView) return;

    this.current = this.current + inc;
    if (this.current < 0) this.current = this.itemLen - 1;
    if (this.current >= this.itemLen) this.current = 0;

    this.item[ this.current ].scrollIntoView({
      block: 'nearest',
      inline: 'nearest'
    });

    // preload next image
    let next = this.current + (inc || 1);
    if (next < 0) next = this.itemLen - 1;
    if (next >= this.itemLen) next = 0;

    const img = this.item[next].querySelector('img');
    if (img && !img.complete) {
      const preload = new Image();
      preload.src = img.src;
    }

  }

}

// register component
window.customElements.define('slide-show', SlideShow);
