import facebook from '../../../assets/svg/facebook.svg';
import twitter from '../../../assets/svg/twitter.svg';
import social from '../../../assets/svg/social.svg';
import instagram from '../../../assets/svg/instagram.svg';
// import './FollowUS.css';

const FollowUs = () => {
    const socialLinks = [
        {icon:facebook, link:"https://www.facebook.com/profile.php?id=61570682215802&mibextid=ZbWKwL"},
        {icon:twitter, link:"#"},
        {icon:instagram, link:"#"},
        {icon:social, link:"#"},
    ]
  return (
    <div className='social-links'>
        <h3>Folgen Sie uns</h3>
        <div className="social-icons">
            {
                socialLinks.map((item,index)=>(
                    <a href={item.link} target='_blank' key={index}><img src={item.icon}/></a>
                ))
            }
        </div>
    </div>
  )
}

export default FollowUs