import avatarPic from '../../assets/imgavatar.png';

function HeroPortraitCanvas() {
  return (
    <div className="hero-visual">
      <img src={avatarPic} alt="Aswin S portrait" className="hero-avatar" loading="lazy" />
    </div>
  )
}

export default HeroPortraitCanvas
