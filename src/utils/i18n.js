function generatetitle(title) {

    let hasTitle = this.$te('route.' + title)
    if (hasTitle) {
        let translateTitle = this.$t('route.' + title)
        return translateTitle
    }
    return title
}
export default generatetitle