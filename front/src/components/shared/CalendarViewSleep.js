import React from 'react';
import classNames from 'classnames';
import { Badge } from 'components/ui';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';

export const eventColors = {
    // ... (이전 코드와 동일)
};

const CalendarViewSleep = (props) => {
    const { wrapperClass, ...rest } = props;

    return (
        <div className={classNames('calendar', wrapperClass)}>
            <FullCalendar
                initialView="dayGridMonth" // 월간 보기로 설정
                headerToolbar={{
                    left: 'title',
                    center: '',
                    right: 'prev,next', // 다음달과 저번달 보기만 남김
                }}
                eventContent={(arg) => {
                    const { extendedProps } = arg.event;
                    const { isEnd, isStart } = arg;
                    return (
                        <div
                            className={classNames(
                                'custom-calendar-event',
                                extendedProps.eventColor
                                    ? eventColors[extendedProps.eventColor]?.bg
                                    : '',
                                extendedProps.eventColor
                                    ? eventColors[extendedProps.eventColor]
                                          ?.text
                                    : '',
                                isEnd &&
                                    !isStart &&
                                    '!rounded-tl-none !rounded-bl-none !rtl:rounded-tr-none !rtl:rounded-br-none',
                                !isEnd &&
                                    isStart &&
                                    '!rounded-tr-none !rounded-br-none !rtl:rounded-tl-none !rtl:rounded-bl-none'
                            )}
                        >
                            {!(isEnd && !isStart) && (
                                <Badge
                                    className={classNames(
                                        'mr-1 rtl:ml-1',
                                        extendedProps.eventColor
                                            ? eventColors[
                                                  extendedProps.eventColor
                                              ].dot
                                            : ''
                                    )}
                                />
                            )}
                            {!(isEnd && !isStart) && (
                                <span>{arg.timeText}</span>
                            )}
                            <span className="font-semibold ml-1 rtl:mr-1">
                                {arg.event.title}
                            </span>
                        </div>
                    );
                }}
                plugins={[dayGridPlugin, interactionPlugin]}
                {...rest}
            />
        </div>
    );
};

export default CalendarViewSleep;
