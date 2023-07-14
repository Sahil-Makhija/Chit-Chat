import DOMPurify from 'dompurify'
import React from 'react'

const RecdMsg = ({ msg }) => {
    const { content, username, type , sender} = msg
    
    let displayMsg = () => {
        switch (type) {
            case 'bold':
                return <strong>{content}</strong>
            case 'italics':
                return <i>{content}</i>
            case 'strikeThrough':
                return <strike>{content}</strike>
            case 'link':
                return <a className='text-blue-500 underline' target='_blank' rel='noreferrer' href={'//' + content}>{content}</a>
            case 'list':
                const listItems = content.split('\n')
                return (<ul className='  ' >
                    {listItems?.map((i)=>{
                        return <li>{i}</li>
                    })}
                </ul>)
            case 'orderedList':
                const orderedListItems = content.split('\n')
                return (<ol className='  ' >
                    {orderedListItems?.map((i)=>{
                        return <li>{DOMPurify.sanitize(i)}</li>
                    })}
                </ol>)
            case 'blockQuote':
                return (<blockquote>{content}</blockquote>)
            case 'code':
                return <pre><code>{content}</code></pre>
            default:
                return (<p>{content}</p>);
        }
    }
    return (
        <div className='w-full min-h-[25px] flex  justify-start p-2' >
            <div className='  bg-[--sec] flex flex-col overflow-hidden  text-white text-xl rounded-md p-1'>
                <h3 className='bg-inherit text-xs w-full text-left'>{username || sender?.username}</h3>
                {displayMsg()}
            </div>
        </div>
    )
}

export default RecdMsg
