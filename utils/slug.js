const genSlug = async (id, title, model) => {
    let slugOriginal = toSlug(title);
    let slug = toSlug(title);
    let checkExist = true;
    let counter = 0;
    while (checkExist === true) {
      const article = await model.findOne({
        slug,
        _id: {
          $ne: id,
        },
      });
      if (article) {
        counter += 1;
        slug = slugOriginal ? slugOriginal + '-' + counter : '';
      } else {
        checkExist = false;
      }
    }
    return slug;
}

function toSlug(value) {
    var slug = value;
    slug = value.replace(/`|"|'|(|)/gi, '');
    slug = value.replace(/&|_|\.|:/gi, '-');

    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');

    slug = slug.substr(0, 255);

    slug = slug.replace(/[^a-zA-Z0-9_\+]/gi, '-');
    //xóa --------------
    slug = slug.replace(/(-+)/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    slug = slug.toLowerCase();

    return slug.trimEnd();
}
module.exports = {
  genSlug
}