import { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function TypeOfContent({ item }) {
  if (item.type == 'text') {
    return <p style={item.style}>{item?.content}</p>
  }
  else if (item.type == 'button') {
    return <button style={item.style}>{item?.content}</button>
  }
  else if (item.type === 'image') {
    return <img src={item?.src} style={item?.style} />
  }
  else if (item.type === 'shape') {
    return <div style={item?.style}></div>
  }
}


function Recursion({ element = [], handleMoveStart, handleMoveEnd }) {
  return element?.map((item, index) => (
    <div
      key={index}
      onDrag={() => handleMoveStart ? handleMoveStart(item) : ''}
      // onDragOver={(e) => e.preventDefault()}
      // onDrop={handleMoveEnd}
      draggable={handleMoveStart ? true : false}
    >
      {item &&
        <TypeOfContent item={item} />
      }
      {/* <p style={item.style}>{item.content}</p> */}
      {item?.items && item?.items.length > 0 &&
        (<Recursion element={item.items} />)}
    </div>
  )
  )
}

function HelperFunction({ type, draggedItem, changeValue }) {
  switch (type) {
    case 'image':
      return (
        <><div className='flex items-center'>
          <label htmlFor='Source'> Source : </label>
          <input type='text' id='Source' className='outline-none border ' value={draggedItem?.src ? draggedItem?.src : ''} onChange={(e) => changeValue('src', e)} />
        </div>
          <div className='flex items-center'>
            <label htmlFor='width'> Width : </label>
            <input type='number' min={0} max={100} id='width' className='outline-none bg-gray-300' value={draggedItem?.style?.width ? parseFloat(draggedItem?.style?.width) : 0} onChange={(e) => changeValue('width', e)} />
          </div>
          <div className='flex items-center'>
            <label htmlFor='height'> height : </label>
            <input type='number' min={0} max={100} id='height' className='outline-none bg-gray-300' value={draggedItem?.style?.height ? parseFloat(draggedItem?.style?.height) : 0} onChange={(e) => changeValue('height', e)} />
          </div>
          <div>
            <p>Position : </p>
            <div className='flex gap-x-4 items-center'>
              <div className='flex items-center'>
                <label htmlFor='positionX'>X : </label>
                <input type='number' id='positionX'
                  className='outline-none w-[50px] bg-gray-300' value={draggedItem ? Number(draggedItem?.style?.left?.slice(0, -1)) : 0}
                  onChange={(e) => {
                    changeValue('left', e)
                  }}
                />
              </div>
              <div className='flex items-center'>
                <label htmlFor='positionY'> Y : </label>
                <input type='number' id='positionY'
                  className='outline-none w-[50px] bg-gray-300' value={draggedItem ? Number(draggedItem?.style?.top?.slice(0, -1)) : 0}
                  onChange={(e) => {
                    changeValue('top', e)
                  }}
                />
              </div>
            </div>
          </div>
        </>)
    case 'button':
      return (<>
        <div className='flex items-center'>
          <label htmlFor='content'>Content : </label>
          <input type='text' id='content' className='outline-none border border-gray-600' value={draggedItem?.content ? draggedItem?.content : ''} onChange={(e) => changeValue('content', e)} />
        </div>
        <div className='flex items-center'>
          <label htmlFor='fontColor'>Color : </label>
          <input type='color' defaultValue={'#ff0000'} id='fontColor' className='outline-none' value={draggedItem?.style?.color ? draggedItem?.style?.color : '#000000'} onChange={(e) => changeValue('color', e)} />
        </div>
        <div className='flex items-center'>
          <label htmlFor='fontSize'>Font Size : </label>
          <input type='number' id='fontSize' className='outline-none w-[50px] bg-gray-300' value={draggedItem?.style?.fontSize ? parseFloat(draggedItem?.style?.fontSize) : 0} onChange={(e) => changeValue('fontSize', e)} />
        </div>
        <div>
          <p>Position : </p>
          <div className='flex gap-x-4 items-center'>
            <div className='flex items-center'>
              <label htmlFor='positionX'>X : </label>
              <input type='number' id='positionX'
                className='outline-none w-[50px] bg-gray-300 ' value={draggedItem ? Number(draggedItem?.style?.left?.slice(0, -1)) : 0}
                onChange={(e) => {
                  changeValue('left', e)
                }}
              />
            </div>
            <div className='flex items-center'>
              <label htmlFor='positionY'> Y : </label>
              <input type='number' id='positionY'
                className='outline-none w-[50px] bg-gray-300 ' value={draggedItem ? Number(draggedItem?.style?.top?.slice(0, -1)) : 0}
                onChange={(e) => {
                  changeValue('top', e)
                }}
              />
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <label htmlFor='bgColor'>Background Color :</label>
          <input type='color' id='bgColor' className='outline-none' value={draggedItem?.style?.backgroundColor} onChange={(e) => changeValue('backgroundColor', e)} />
        </div>
        <div>
          <p>Spacing : </p>
          <div className='flex gap-x-4 items-center'>
            <div className='flex items-center'>
              <label htmlFor='spacingX'>X : </label>
              <input type='number' id='spacingX'
                className='outline-none w-[50px] bg-gray-300 ' value={draggedItem ? Number(draggedItem?.style?.paddingLeft.slice(0, -1)) : 0}
                onChange={(e) => {
                  changeValue('paddingLeft', e)
                  changeValue('paddingRight', e)
                }}
              />
            </div>
            <div className='flex items-center'>
              <label htmlFor='spacingY'> Y : </label>
              <input type='number' id='spacingY'
                className='outline-none w-[50px] bg-gray-300 ' value={draggedItem ? Number(draggedItem?.style?.paddingTop.slice(0, -1)) : 0}
                onChange={(e) => {
                  changeValue('paddingTop', e)
                  changeValue('paddingBottom', e)
                }}
              />
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <label htmlFor='borderRadius'>Border Radius : </label>
          <input type='number' id='borderRadius'
            className='outline-none w-[50px] bg-gray-300 '
            value={draggedItem ? parseFloat(draggedItem?.style?.borderRadius) : 0}
            onChange={(e) => changeValue('borderRadius', e)}
          />
        </div>
      </>)
    case 'shape':
      return (<>
        <div>
          <p>Position : </p>
          <div className='flex gap-x-4 items-center'>
            <div className='flex items-center'>
              <label htmlFor='positionX'>X : </label>
              <input type='number' id='positionX'
                className='outline-none w-[50px] bg-gray-300' value={draggedItem ? Number(draggedItem?.style?.left?.slice(0, -1)) : 0}
                onChange={(e) => {
                  changeValue('left', e)
                }}
              />
            </div>
            <div className='flex items-center'>
              <label htmlFor='positionY'> Y : </label>
              <input type='number' id='positionY'
                className='outline-none w-[50px] bg-gray-300' value={draggedItem ? Number(draggedItem?.style?.top?.slice(0, -1)) : 0}
                onChange={(e) => {
                  changeValue('top', e)
                }}
              />
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <label htmlFor='width'> Width : </label>
          <input type='number' min={0} max={100} id='width' className='outline-none bg-gray-300' value={draggedItem?.style?.width ? parseFloat(draggedItem?.style?.width) : 0} onChange={(e) => changeValue('width', e)} />
        </div>
        <div className='flex items-center'>
          <label htmlFor='height'> height : </label>
          <input type='number' min={0} max={100} id='height' className='outline-none bg-gray-300' value={draggedItem?.style?.height ? parseFloat(draggedItem?.style?.height) : 0} onChange={(e) => changeValue('height', e)} />
        </div>
        <div className='flex items-center'>
          <label htmlFor='bgColor'>Background Color :</label>
          <input type='color' id='bgColor' className='outline-none' value={draggedItem?.style?.backgroundColor} onChange={(e) => changeValue('backgroundColor', e)} />
        </div>
        <div className='flex items-center'>
          <label htmlFor='opacity'>Transparency : </label>
          <input type='number' min={0} max={1} step={0.1} id='opacity' className='outline-none bg-gray-300' value={draggedItem?.style?.opacity} onChange={(e) => changeValue('opacity', e)} />
        </div>
        <div className='flex items-center'>
          <label htmlFor='borderRadius'>Border Radius : </label>
          <input type='number' min={0} id='borderRadius'
            className='outline-none w-[50px] bg-gray-300'
            value={draggedItem ? parseFloat(draggedItem?.style?.borderRadius) : 0}
            onChange={(e) => changeValue('borderRadius', e)}
          />
        </div>
        </>)
    case 'text':
      return (<><div className='flex items-center'>
        <label htmlFor='content'>Content : </label>
        <input type='text' id='content' className='outline-none border border-gray-600' value={draggedItem?.content ? draggedItem?.content : ''} onChange={(e) => changeValue('content', e)} />
      </div>
        <div className='flex items-center'>
          <label htmlFor='fontColor'>Color : </label>
          <input type='color' id='fontColor' className='outline-none border-gray-600' value={draggedItem?.style?.color ? draggedItem?.style?.color : '#000000'} onChange={(e) => changeValue('color', e)} />
        </div>
        <div className='flex items-center'>
          <label htmlFor='fontSize'>Font Size : </label>
          <input type='number' id='fontSize' className='outline-none bg-gray-300 w-[50px]' value={draggedItem?.style?.fontSize ? parseFloat(draggedItem?.style?.fontSize) : 0} onChange={(e) => changeValue('fontSize', e)} />
        </div>
        <div>
          <p>Position : </p>
          <div className='flex gap-x-4 items-center'>
            <div className='flex items-center'>
              <label htmlFor='positionX'>X : </label>
              <input type='number' id='positionX'
                className='outline-none w-[50px] bg-gray-300' value={draggedItem ? Number(draggedItem?.style?.left?.slice(0, -1)) : 0}
                onChange={(e) => {
                  changeValue('left', e)
                }}
              />
            </div>
            <div className='flex items-center'>
              <label htmlFor='positionY'> Y : </label>
              <input type='number' id='positionY'
                className='outline-none w-[50px] bg-gray-300' value={draggedItem ? Number(draggedItem?.style?.top?.slice(0, -1)) : 0}
                onChange={(e) => {
                  changeValue('top', e)
                }}
              />
            </div>
          </div>
        </div>
      </>)
    default:
      break;
  }
}

let propertiesOfElement = {
  'Text': {
    type: 'text',
    content: 'dragged Text Item',
    style: {
      'color': '#008000',
      'fontSize': '1vw',
      'position': 'absolute',
      'left': '0%',
      'top': '0%',
    },
    items: []
  },
  'button': {
    type: 'button',
    content: 'btn',
    style: {
      'backgroundColor': '#0000FF',
      'color': '#FFFFFF',
      'fontSize': '1.5vw',
      'position': 'absolute',
      'left': '0%',
      'top': '0%',
      'paddingLeft': '1%',
      'paddingRight': '1%',
      'paddingTop': '1%',
      'paddingBottom': '1%',
      'borderRadius': '0px',
      'cursor': 'pointer',
    }
  },
  'image': {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
    style: {
      'width': '100%',
      'height': '100%',
      'position': 'absolute',
      'left': '0%',
      'top': '0%',
      'borderRadius': '0px',
      'zIndex': 0,
      'objectFit': 'cover',
      'cursor': 'pointer',
      'boxShadow': 'none',
    }
  },
  'rectangle': {
    type: 'shape',
    style: {
      'width': '20%',
      'height': '20%',
      'backgroundColor': '#000000',
      'position': 'absolute',
      'left': '0%',
      'top': '0%',
    }
  },
  'circle': {
    type: 'shape',
    style: {
      'width': '20%',
      'height': '20%',
      'backgroundColor': '#000000',
      'borderRadius': '100%',
      'position': 'absolute',
      'left': '0%',
      'top': '0%',
    }
  }
}

function App() {
  // const [showPreview, setshowPreview] = useState(false)
  const [showShapes, setshowShapes] = useState(false)
  const [Id, setId] = useState(0)
  const CanvasRef = useRef(null)
  const [draggedItem, setdraggedItem] = useState(null)
  // const [droppedItem, setdroppedItem] = useState()
  // const [TextBox, setTextBox] = useState({
  //   id: Id,
  //   type: 'text',
  //   content: 'Sample',
  //   style: {
  //     'color': '#FF0000',
  //     'fontSize': '2.3vw',
  //     'position': 'absolute',
  //     'left': '0%',
  //     'top': '0%'
  //   },
  //   items: [{
  //     id: Id + 1,
  //     type: 'text',
  //     content: 'Test',
  //     style: {
  //       'color': '#FFFF00',
  //       'fontSize': '1.2vw',
  //       'position': 'absolute',
  //       'left': '5%',
  //       'top': '5%'

  //     }
  //   }]
  // })
  const [Element, setElement] = useState([])
  let handleDragStart = (type, e) => {
    if (type === 'Text') {
      setdraggedItem({
        id: Id,
        ...propertiesOfElement.Text
      })
    }
    else if (type === 'button') {
      setdraggedItem({
        id: Id,
        ...propertiesOfElement.button
      })
    }
    else if (type === 'image') {
      setdraggedItem({
        id: Id,
        ...propertiesOfElement.image
      })
    }
    else if (type === 'SquareShape') {
      setdraggedItem({
        id: Id,
        ...propertiesOfElement.rectangle
      })
    }
    else if (type === 'CircleShape') {
      setdraggedItem({
        id: Id,
        ...propertiesOfElement.circle
      })
    }
  }
  let handleDrop = (e) => {
    if (!draggedItem) {
      return
    }
    console.log(draggedItem)
    e.preventDefault()
    let arr = Element

    const canvas = CanvasRef.current;
    const CanvasRect = canvas.getBoundingClientRect()

    let found = arr.some(item => item.id === draggedItem.id)

    // console.log(`e.clientX = ` + e.clientX + 'CanvasRect.left = ' + CanvasRect.left + ' CanvasRect.width = ' + CanvasRect.width + '  ' + (e.clientX - CanvasRect.left) / CanvasRect.width)

    if (!found) {
      if (draggedItem.type === 'image') {
        arr.push(
          { ...draggedItem }
        )
      }
      else {
        arr.push({
          id: Id,
          type: draggedItem?.type,
          content: draggedItem?.content,
          style: {
            ...draggedItem.style,
            left: `${(e.clientX - CanvasRect.left) * 100 / CanvasRect.width}%`,
            top: `${(e.clientY - CanvasRect.top) * 100 / CanvasRect.height}%`,
          },
          items: []
        })
      }
      setId(Id + 1)
      setElement(arr)
    }
    else {
      setElement((prevElement) =>
        prevElement.map((el, index) => {
          if (el.id === draggedItem.id) {
            return {
              ...el,
              style: {
                ...el.style,
                left: `${(e.clientX - CanvasRect.left) * 100 / CanvasRect.width}%`,
                top: `${(e.clientY - CanvasRect.top) * 100 / CanvasRect.height}%`,
              }
            }
          }
          else {
            return { ...el }
          }
        })
      )

    }

  }
  let handleMoveStart = (item) => {
    // console.log(item)
    setdraggedItem({
      ...item,
      style: {
        ...item.style,
        border: '2px solid red',
      }
    })
  }
  let handleMoveEnd = (e) => {
    if (!draggedItem) {
      return
    }

    e.preventDefault()
    const canvas = CanvasRef.current;
    const CanvasRect = canvas.getBoundingClientRect()

    let arr = Element

    // let arr=Element.forEach((item)=>{
    //   if(item.id===draggedItem.id){
    //     item.left=e.clientX - CanvasRect.left
    //     item.top=e.clientY - CanvasRect.top
    //   }
    // })
    // console.log(arr)
    setElement(arr)
  }
  let changeValue = (type, e) => {
    // console.log(draggedItem)
    let temp;
    setElement((prevElement) =>
      prevElement.map((item) => {
        if (item.id === draggedItem.id) {
          let temp
          if (type === 'content' || type === 'src') {
            temp = {
              ...item,
              [type]: e.target.value
            }
          }
          else if (type === 'paddingLeft' || type === 'paddingRight' || type === 'paddingTop' || type === 'paddingBottom' || type === 'width' || type === 'height' || type === 'left' || type === 'top') {
            temp = {
              ...item,
              style: {
                ...item.style,
                [type]: `${e.target.value}%`
              }
            }
            // console.log(item)
          }
          else if (type === 'borderRadius') {
            temp = {
              ...item,
              style: {
                ...item.style,
                [type]: `${e.target.value}px`
                // [type]:'10px'
              }
            }
            // console.log(typeof temp.style.borderRadius,temp.style.borderRadius)
          }
          else if (type === 'fontSize') {
            temp = {
              ...item,
              style: {
                ...item.style,
                [type]: `${e.target.value}vw`
              }
            }
            // console.log(typeof temp.style.fontSize, temp.style.fontSize)
          }
          else {
            temp = {
              ...item,
              style: {
                ...item.style,
                [type]: e.target.value
              }
            }
          }
          setdraggedItem({ ...temp })
          return temp
        }
        else {
          return { ...item }
        }
      }))
    console.log(temp)
  }
  let handlePreview = () => {
    
    const newTab = window.open('', '_blank')
    newTab.document.write(
      `<div id="preview-root" style={{height:100%;position: relative}}></div>`
    )
    newTab.document.close()

    newTab.document.body.style.margin = '0px'

    const mountPoint = newTab.document.getElementById('preview-root')

    mountPoint.style.height = '2000px'
    mountPoint.style.position = 'relative'

    const root = createRoot(mountPoint);
    root.render(<Recursion element={Element} />)
  }
  return (
    <>
      <div className='flex min-h-screen w-[100%] h-fit bg-gray-300 relative'>
        <div className='border border-green-600 w-[70%] h-[500px] m-10 h-[500px] overflow-scroll'>
          <div className='w-[100%] bg-white h-[2000px] relative overflow-hidden' id='canvas'
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            ref={CanvasRef}
          >

            {Element &&
              <Recursion element={Element} handleMoveStart={handleMoveStart} handleMoveEnd={handleMoveEnd} />
            }
          </div>
          {/* </div> */}
        </div>
        <div className='w-[30%] border flex flex-col items-center'>
          <div className='mt-12 fit flex flex-col gap-y-4 w-full px-10'>
            <p
              onClick={handlePreview}
              className='bg-black text-white py-1 px-2 cursor-pointer'
            >
              Preview
            </p>
            <p
              draggable
              onDragStart={(e) => handleDragStart('Text', e)}
              className='bg-black text-white py-1 px-2 cursor-pointer'
            >
              Text
            </p>
            <p
              draggable
              onDragStart={(e) => handleDragStart('button', e)}
              className=' bg-black text-white py-1 px-2 cursor-pointer'
            >
              button
            </p>
            <p
              draggable
              onDragStart={(e) => handleDragStart('image', e)}
              className=' bg-black text-white py-1 px-2 cursor-pointer'
            >
              Image
            </p>
            <div className='w-[100%] flex flex-col items-start justify-center'>
              <div
                onClick={() => setshowShapes(!showShapes)}
                className='w-full bg-black text-white py-1 px-2 cursor-pointer flex items-center justify-between'
              >
                Shapes
                {
                  showShapes
                    ?
                    <FontAwesomeIcon icon={faXmark} />
                    :
                    <FontAwesomeIcon icon={faChevronDown} />
                }
              </div>
              {
                showShapes &&
                <div className='flex gap-5 flex-wrap w-[100%] px-2 bg-gray-600 py-3 '>
                  <div className='w-[50px] h-[50px] bg-black cursor-pointer'
                    draggable
                    onDragStart={(e) => handleDragStart('SquareShape', e)}
                  >
                  </div>
                  <div className='w-[50px] h-[50px] rounded-full bg-black cursor-pointer'
                    draggable
                    onDragStart={(e) => handleDragStart('CircleShape', e)}
                  >
                  </div>
                </div>
              }
            </div>

          </div>
          {draggedItem &&
            <div className='w-fit h-fit flex flex-col gap-y-3 border mt-6 bg-white py-4 px-2'>
              <HelperFunction type={draggedItem?.type} draggedItem={draggedItem} changeValue={changeValue} />
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default App
