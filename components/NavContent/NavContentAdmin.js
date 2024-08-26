import React from 'react'
import MenuItem from '../MenuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarChart } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightFromBracket, faCalendarAlt, faChartSimple, faCubes, faGear, faPeopleGroup, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'

export default function NavContentAdmin() {
    return (
        <>
            <ul className="flex flex-col gap-1 items-center">
                <MenuItem
                    text='Dashboard'
                    icon={faCubes}
                />
                <MenuItem
                    text='Attendance'
                    icon={faCalendarAlt}
                    selected
                />
                <MenuItem
                    text='Settings'
                    icon={faGear}
                />
            </ul>
        </>
    )
}