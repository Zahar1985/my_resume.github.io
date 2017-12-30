function toggle( targetId ) {
 if ( document.getElementById ) {
 target = document.getElementById( targetId );
 if ( target.style.display == "none" ) {
 target.style.display = "";
 } else {
 target.style.display = "none";
 }
 }
}
function popup(mylink, windowname, width, height) {
 if (! window.focus)return true;
 var href;
 if (typeof(mylink) == 'string')
 href=mylink;
 else
 href=mylink.href;
 window.open(href, windowname,"type=fullWindow,scrollbars=yes");
 return false;}
 <a href="javascript:toggle('lakes')" target="mapdisplay">Toggle Lakes</a>