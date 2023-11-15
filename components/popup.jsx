import style from "@/components/Popup.module.css"
const Popup = ({ path, updatePath }) => {
    if (path) {
        function closeModal(ev) {
            if (ev.target.classList.contains(style.popupWrapper)) {
                if (updatePath) {
                    updatePath(null)
                } else {
                    ev.target.remove()
                }
            }
        }
        return (
            <div className={style.popupWrapper} onClick={closeModal}>
                <div className={style.popupContainer}>
                    <iframe frameBorder={0} src={path} width={"100%"} height={"100%"} />
                </div>
            </div>
        )
    }
    return null;
}

export default Popup