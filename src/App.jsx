import { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faForward, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function TypeOfContent({ item, setdraggedItem }) {
  if (item.type == 'text') {
    return <p style={item.style} onClick={(e) => {
      e.stopPropagation()
      setdraggedItem({ ...item })
    }}
    >{item?.content}</p>
  }
  else if (item.type == 'button') {
    return <button style={item.style} onClick={(e) => {
      e.stopPropagation()
      setdraggedItem({ ...item })
    }}>{item?.content}</button>
  }
  else if (item.type === 'image') {
    return <img src={item?.src} onClick={(e) => {
      e.stopPropagation()
      setdraggedItem({ ...item })
    }} style={item?.style} />
  }
  // else if (item.type === 'shape') {
  //   return <div style={item?.style}></div>
  // }
}


function Recursion({ element = [], handleMoveStart, setdraggedItem }) {
  return element?.map((item, index) => (
    <div
      key={index}
      onDrag={() => handleMoveStart ? handleMoveStart(item) : ''}
      onClick={(e) => {
        if (item.type === 'shape') {
          e.stopPropagation()
          setdraggedItem({ ...item })
        }
      }
      }
      style={item.type === 'shape' ? item?.style : null}
      draggable={handleMoveStart ? true : false}
    >
      {item &&
        <TypeOfContent item={item} setdraggedItem={setdraggedItem} />
      }
      {/* <p style={item.style}>{item.content}</p> */}
      {item?.items && item?.items.length > 0 &&
        (<Recursion element={item.items} />)}
    </div>
  )
  )
}

function ChildElement({ arr, setdraggedItem, level }) {
  return arr?.map((item) => {
    return (
      <>
        <div
          key={item}
          onClick={() => setdraggedItem({ ...item })}
          className='border bg-gray-200 flex gap-x-1 '
          style={{
            marginLeft: `${level * 10}px`,
            width: `calc(100%-(${level * 10}px))`
          }}
        >
          <span>{item?.type ? item.type : ''}</span>
          <span><FontAwesomeIcon icon={faCircleChevronRight} /></span>
          <span>{item?.content ? item.content : ''}</span>
        </div>
        {item.items &&
          <ChildElement arr={item?.items} setdraggedItem={setdraggedItem} level={level + 1} />}
      </>
    )
  }
  )
}

function HelperFunction({ type, draggedItem, changeValue, setAddChildStatus, AddChildStatus, setdraggedItem }) {
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
                  // changeValue('paddingRight', e)
                }}
              />
            </div>
            <div className='flex items-center'>
              <label htmlFor='spacingY'> Y : </label>
              <input type='number' id='spacingY'
                className='outline-none w-[50px] bg-gray-300 ' value={draggedItem ? Number(draggedItem?.style?.paddingTop.slice(0, -1)) : 0}
                onChange={(e) => {
                  changeValue('paddingTop', e)
                  // changeValue('paddingBottom', e)
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
            value={draggedItem?.style?.borderRadius ? parseFloat(draggedItem?.style?.borderRadius) : 0}
            onChange={(e) => changeValue('borderRadius', e)}
          />
        </div>
        <div className='flex items-center'>
          <label htmlFor='child'>Add Child</label>
          <input
            type='checkbox'
            checked={AddChildStatus}
            onChange={(e) => setAddChildStatus(e.target.checked)}
          />
        </div>
        <div className='flex flex-col items-start'>
          <p>Children</p>
          <div className='flex flex-col gap-y-2 items-start w-[100%]'>
            {draggedItem.items &&
              // draggedItem?.items.map((item) => {
              //   return (<div className='w-full flex flex-col gap-y-1'
              //   key={item}>
              <ChildElement arr={draggedItem?.items} setdraggedItem={setdraggedItem} level={1} />
              // </div>)
            }
          </div>
        </div >
      </>)
    case 'text':
      return (<><div className='flex items-center'>
        <label htmlFor='content'>Content : </label>
        <input type='text' id='content' className='outline-none border border-gray-600' value={draggedItem.content ? draggedItem?.content : ''} onChange={(e) => changeValue('content', e)} />
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
      'margin': '0px'
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
      'margin': '0px'
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
      'margin': '0px'
    }
  },
  'rectangle': {
    type: 'shape',
    active_child: false,
    style: {
      'width': '20%',
      'height': '20%',
      'backgroundColor': '#000000',
      'position': 'absolute',
      'left': '0%',
      'top': '0%',
      'margin': '0px'
    },
    items: []
  },
  'circle': {
    type: 'shape',
    active_child: false,
    style: {
      'width': '20vw',
      'height': '20vw',
      'backgroundColor': '#000000',
      'borderRadius': '100%',
      'position': 'absolute',
      'left': '0%',
      'top': '0%',
      'margin': '0px'
    },
    items: []
  }
}

function App() {
  const [showShapes, setshowShapes] = useState(false)
  const [Id, setId] = useState(0)
  const CanvasRef = useRef(null)
  const [draggedItem, setdraggedItem] = useState(null)
  const [previousDraggedItem, setpreviousDraggedItem] = useState(null)
  const [Element, setElement] = useState([])
  const [AddChildStatus, setAddChildStatus] = useState(false)
  let handleDragStart = (type, e) => {
    setpreviousDraggedItem({ ...draggedItem })
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
    
    e.preventDefault()
    let arr = Element

    const canvas = CanvasRef.current;
    const CanvasRect = canvas.getBoundingClientRect()

    let found = arr.some(item => item.id === draggedItem.id)

    function addChildElement(arr) {
      return arr.map((item) => {
        if (item.id === previousDraggedItem.id) {
          item.items = [...item.items, { ...draggedItem }]
          return {
            ...item
          }
        }
        if (item.items && item.items.length > 0) {
          return {
            ...item,
            items: addChildElement(item.items)
          }
        }
        return item
      })
    }
    if (AddChildStatus) {
      const newArr = addChildElement(Element)
      setId(Id + 1)
      setElement(newArr)
      setAddChildStatus(false)
      return
    }

    if (!found) {
      if (draggedItem.type === 'image') {
        arr.push(
          { ...draggedItem }
        )
      }
      else {
        arr.push({
          id: draggedItem?.id,
          type: draggedItem?.type,
          content: draggedItem?.content,
          active_child: true,
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
          el.active_child = false
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
    setdraggedItem({
      ...item,
      style: {
        ...item.style,
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

    setElement(arr)
  }
  let changeValue = (type, e) => {
    let item
    function replaceValue(array) {
      return array?.map((el) => {
        if (el.id === draggedItem.id) {
          if (type === 'content' || type === 'src') {
            item = {
              ...el,
              [type]: `${e.target.value}`
            }
            setdraggedItem({ ...item })
            return { ...item }
          }
          else if (type === 'paddingLeft' || type === 'paddingRight' || type === 'paddingTop' || type === 'paddingBottom' || type === 'width' || type === 'height' || type === 'left' || type === 'top') {
            if (draggedItem.type === 'CircleShape' && (type === 'wdith' || type === 'height')) {
              item = {
                ...el,
                [type]: `${e.target.value}vw`
              }
              setdraggedItem({ ...item })
              return { ...item }

            }
            else if(draggedItem.type==='button' && (type==='paddingLeft' || type==='paddingTop')){
              if(type==='paddingLeft'){
                item={
                  ...el,
                  style:{
                    ...el.style,
                    'paddingLeft':`${e.target.value}%`,
                    'paddingRight':`${e.target.value}%`
                  }
                }
                setdraggedItem({...item})
                return item
              }
              else{
                item={
                  ...el,
                  style:{
                    ...el.style,
                    'paddingTop':`${e.target.value}%`,
                    'paddingBottom':`${e.target.value}%`
                  }
                }
                setdraggedItem({...item})
                return item
              }
            }
            else {
              item = {
                ...el,
                style: {
                  ...el.style,
                  [type]: `${e.target.value}%`
                }
              }
              setdraggedItem({ ...item })
              return { ...item }

            }
          }
          else if (type === 'borderRadius') {
            item = {
              ...el,
              style: {
                ...el.style,
                [type]: `${e.target.value}px`
                // [type]:'10px'
              }
            }
            setdraggedItem({ ...item })
            return { ...item }
            // return el
          }
          else if (type === 'fontSize') {
            item = {
              ...el,
              style: {
                ...el.style,
                [type]: `${e.target.value}vw`
              }
            }
            setdraggedItem({ ...item })
            return { ...item }
          }
          else {
            item = {
              ...el,
              style: {
                ...el.style,
                [type]: e.target.value
              }
            }
            setdraggedItem({ ...item })
            return { ...item }
          }
        }

        if (el.items && el.items.length > 0) {
          return {
            ...el,
            items: replaceValue(el.items)
          }
        }
        return el;
      })
    }
    const updatedArray = replaceValue(Element)
    setElement(updatedArray)
    const updatedItem = findItemByID(updatedArray, draggedItem.id)
    if (updatedItem) {
      setdraggedItem(updatedItem)
    }
    function findItemByID(arr, id) {
      for (let el of arr) {
        if (el.id === id) {
          return el
        }
        if (el.items && el.items.length > 0) {
          const found = findItemByID(el.items, id)
          if (found) return found
        }
        return null
      }
    }
  }
  let handleRemove = () => {
    if (!draggedItem) {
      return
    }

    setElement((prevElement) =>
      prevElement.filter((item) =>
        item.id !== draggedItem.id
      )
    )
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
              <Recursion element={Element} handleMoveStart={handleMoveStart} setdraggedItem={setdraggedItem} />
            }
          </div>
          {/* </div> */}
        </div>
        <div className='w-[30%] border flex flex-col items-center'>
          <div className='mt-12 fit flex flex-col gap-y-4 w-full px-10'>
            <p
              className='bg-red-600 text-white py-1 px-2 cursor-pointer'
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleRemove}
            >
              Remove
            </p>
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
              <HelperFunction type={draggedItem?.type} draggedItem={draggedItem} changeValue={changeValue} setAddChildStatus={setAddChildStatus} AddChildStatus={AddChildStatus} setdraggedItem={setdraggedItem} />
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default App
