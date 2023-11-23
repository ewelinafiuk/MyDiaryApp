import * as React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {icons} from '../constants/icons'

const styles = {
    container: {
      marginTop: 50,
    }
  };

function MyTimeline({events, categories}) {
    const formatDate = (date) => new Date(date).toLocaleDateString()
    return (
        <div style={styles.container}>
        <VerticalTimeline>
            {events.map((event, idx) => {
                const cat = categories.find(c => c.id === event.categoryId)
                const color = cat?.color ? cat.color : 'blue'
                return (
                    <VerticalTimelineElement
                        contentStyle={{ background: color, color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid ' + color }}
                        date={`${formatDate(event.startDate)} - ${formatDate(event.endDate)}`}
                        iconStyle={{ background: color, color: '#fff' }}
                        icon={icons.find(i => i.label === event.icon)?.value}
                    >
                        <h3 className="vertical-timeline-element-title">{event.name}</h3>
                        <h4 className="vertical-timeline-element-subtitle">Category: {cat?.name ?? ''}</h4>
                        <p> {event.description}</p>
                    </VerticalTimelineElement>
                )
            })}
        </VerticalTimeline>
        </div>
    )
  }
  
  export default MyTimeline;