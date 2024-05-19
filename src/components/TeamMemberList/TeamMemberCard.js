import React from 'react'

const TeamMemberCard = ({ name }) => {
  return (
    <div className='team-memeber-card'>
      <h1 className=''>{name || ""}</h1>
    </div>
  )
}

export default TeamMemberCard