class Markup {
  constructor(photos) {
    this.photos = photos;
    this.clusters = {};
    this.base = 'https://phaa-saa-thai-nuang.s3.eu-central-1.amazonaws.com/';
    this.prepare();

  }

  draw() {
    console.log(this.clusters);

    // navigation
    const gallery = $('#gallery');
    const navigation = $('#navigation');
    let html = '<ul>';

    for (const date in this.clusters) {
      html += `<li><a href="#${date}">${this.getHumanDate(date)}</a></li>`;
    }
    html += '</ul>';

    navigation.html(html);

    // main content
    html = '';
    for (const date in this.clusters) {
      html += `<div class="gallery-item" id="${date}">
                <h2>${this.getHumanDate(date)}</h2>`;

      this.clusters[date].forEach(photo => {
        html += `<a href="${photo}" data-fancybox="gallery" data-caption="${this.getHumanDate(date)}">
                  <img src="${photo}" loading="lazy">
                </a>`;
      })

      html += '</div>';
    }

    gallery.html(html);
  }

  getHumanDate(stroke) {
    const timestamp = Date.parse(stroke);

    const date = new Date(timestamp);
    const dateString = date.toLocaleString('en-GB', {
      timeZone: 'UTC',
      month: 'long',
      day: 'numeric'
    });

    return dateString;
  }

  prepare() {
    this.photos.forEach(photo => {
      const date = this.getDate(photo);
      const path = this.getPath(photo);

      if (date) {
        if (typeof this.clusters[date] === 'undefined') {
          this.clusters[date] = [path]
        } else {
          this.clusters[date].push(path);
        }
      }
    });
  }

  getPath(name) {
    return `${this.base}${name}.jpg`;
  }

  getDate(photoName) {
    const m = photoName.match(/^[\d]{4}-[\d]{2}-[\d]{2}/);

    if (!m.length) return false;

    return m[0];
  }
}

export default Markup;