import {useState, useEffect, RefObject} from 'react';

const useSelectedItem = (itemRef: RefObject<HTMLDivElement>, isMovable: boolean) => {
    const [isItemSelected, setIsItemSelected] = useState(false);

    useEffect(() => {
        if (!isMovable) return;
        const item = itemRef.current;
        if (!item) throw new Error("Item does not exist");
        const slide = item.parentElement;
        if (!slide) throw new Error("Slide does not exist");

        const handleClick = () => {
            item.setAttribute("isSelected", "true");
            setIsItemSelected(true);
        };

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (itemRef.current && !itemRef.current.contains(target)) {
                setIsItemSelected(false);
            }
        };

        item.addEventListener("click", handleClickOutside);
        item.addEventListener("click", handleClick);

        return () => {
            item.removeEventListener("click", handleClickOutside);
            item.removeEventListener("click", handleClick);
        };
    }, [itemRef, isMovable]);
    return isItemSelected
};

export default useSelectedItem;
