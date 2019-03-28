function  generatetitle(title){
    console.log(title,'title');
    
    let hasTitle = this.$te('route.'+title)
    if(hasTitle){
        console.log(this.$t('route.' + title))
        let translateTitle  = this.$t('route.' + title)
        return translateTitle
    }
    return title
}
export default generatetitle