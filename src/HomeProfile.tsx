import styles from "../styles/HomeProfile.module.css"
import Image from "next/Image"
import profilePic from "../public/profile-pic.png"

const HomeProfile = () => {
    return (
    <div className = {styles.section}>
        <div className = {styles.profileBody}><Image className = {styles["profile-pic"]} src = {profilePic} alt = "Profile Pic"></Image></div>
        <div className = {styles["profile-bio"]}>
            <h2><strong>John Doe</strong></h2>
            <h3>Avid blockchain writer</h3>
        </div>
        
        <h3 className = {styles.description}><em>"Early adopter of Bitcoin. I write about the latest breakthroughs in blockchain and advocate for its mass adoption to transform lives."</em></h3>
    </div>
)
}

export default HomeProfile;