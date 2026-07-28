import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames/bind";
import styles from "./editMenuAndBanner.module.scss";
import { Get, Post } from "../../baseService/baseService";
import toast, { Toaster } from "react-hot-toast";
import Banner from "../../home/Banner/Banner";
import { CButton, CFormLabel, CNav, CNavItem, CSpinner, CNavLink as CTabLink, CFormInput, CFormSelect } from "@coreui/react";
import {
    cilList,
    cilImage,
    cilSettings,
    cilSave,
    cilPlus,
    cilArrowTop,
    cilArrowBottom,
    cilTrash,
    cilPencil
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { FormEdit } from "./formEdit/formEdit";
const cx = classNames.bind(styles);

export const EditMenuAndBanner = () => {
    const [data, setData] = useState([
        {
            menu: [
                {
                    title: "Danh mục",
                    local: 1,
                    iCap1: 0,
                    status: false,
                    menu1: []
                }
            ],
            logo: "#",
            banner: [
                {
                    img: "#",
                    locationBanner: 1
                }
            ],
            bannerTopPic: []
        }
    ]);

    const [activeTab, setActiveTab] = useState("menu");
    const [dataEdit, setDataEdit] = useState(null);
    const logoInputRef = useRef(null);
    const [editingLogoIndex, setEditingLogoIndex] = useState(null);

    const bannerInputRef = useRef(null);
    const [editingBannerIndex, setEditingBannerIndex] = useState(null);

    // ===== Banner Top Pic (cấp document, nhóm theo typeofTopPic) =====
    const bannerTopInputRef = useRef(null);
    const [editingTopPicGroupIndex, setEditingTopPicGroupIndex] = useState(null);

    const HandleCallApi = async () => {
        try {
            const newData = await Get("/menu");
            const news = newData?.data?.data;

            const activeM = news.map((item, index) => ({
                ...item,

                bannerTopPic: item.bannerTopPic || [],

                menu: item.menu.map((item1, index1) => ({

                    ...item1,

                    iCap1: index1,

                    status: false,

                    menu1: (item1.menu1 || []).map((item2, index2) => ({

                        ...item2,

                        icap2: index2,

                        status: false,


                        menu2: (item2.menu2 || []).map((item3, index3) => ({

                            ...item3,

                            icap3: index3

                        }))

                    }))

                }))
            }));

            setData(activeM);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        HandleCallApi();
    }, []);

    const toggleMenu = (cap, indexCap1, indexCap2, indexCap3) => {
        const onToggle = data.map(product => ({
            ...product,
            menu: product.menu.map(item1 => {
                if (cap === "cap1" && item1.iCap1 === indexCap1) {
                    return { ...item1, status: !item1.status };
                }
                if (cap === "cap2" && item1.iCap1 === indexCap1) {
                    return {
                        ...item1,
                        menu1: item1.menu1.map(item2 =>
                            item2.icap2 === indexCap2
                                ? { ...item2, status: !item2.status }
                                : item2
                        )
                    };
                }
                return item1;
            })
        }));
        setData(onToggle);

        let result = null;
        const product = onToggle[0];
        if (indexCap2 === null && indexCap3 === null) {
            result = { ...product.menu[indexCap1], _path: { iCap1: indexCap1 } };
        } else if (indexCap3 === null) {
            result = {
                ...product.menu[indexCap1]?.menu1[indexCap2],
                _path: { iCap1: indexCap1, icap2: indexCap2 }
            };
        } else {
            result = {
                ...product.menu[indexCap1]?.menu1[indexCap2]?.menu2[indexCap3],
                _path: { iCap1: indexCap1, icap2: indexCap2, icap3: indexCap3 }
            };
        }
        setDataEdit(result);
    };

    // ================= ADD =================
    const HandleAddDanhMucParent = () => {
        setData((prev) => prev.map((product) => ({
            ...product,
            menu: [
                ...product.menu,
                {
                    title: `Danh mục ${product.menu.length + 1}`,
                    local: product.menu.length + 1,
                    iCap1: product.menu.length,
                    status: false,
                    menu1: []
                }
            ]
        })));
    };

    const HandleAddDanhMucCap1 = (iCap1) => {
        setData((prev) => prev.map((product) => ({
            ...product,
            menu: product?.menu?.map((item) =>
                item.iCap1 === iCap1 ? {
                    ...item,
                    menu1: [
                        ...item.menu1,
                        {
                            titleMenu: `Danh mục ${item.menu1.length + 1}`,
                            typeof: "",
                            location: item.menu1.length + 1,
                            icap2: item.menu1.length,
                            status: false,
                            menu2: []
                        }
                    ]
                } : item
            )
        })));
    };

    const HandleAddDanhMucCap2 = (iCap1, icap2) => {
        setData((prev) => prev.map((product) => ({
            ...product,
            menu: product.menu.map((item1) =>
                item1.iCap1 === iCap1 ? {
                    ...item1,
                    menu1: item1.menu1.map((item2) =>
                        item2.icap2 === icap2 ? {
                            ...item2,
                            typeof: "",
                            menu2: [
                                ...item2.menu2,
                                {
                                    titleChildrenMenu: `Danh mục ${item2.menu2.length + 1}`,
                                    typeofChildrenMenu: "",
                                    locationChildrenMenu: item2.menu2.length + 1,
                                    icap3: item2.menu2.length
                                }
                            ]
                        } : item2
                    )
                } : item1
            )
        })));
    };

    // ================= MOVE (dùng chung) =================
    const swapByField = (arr, idx, newIdx, field, extraSwapFields = []) => {
        const newArr = arr.map(item => ({ ...item }));
        [newArr[idx][field], newArr[newIdx][field]] =
            [newArr[newIdx][field], newArr[idx][field]];

        extraSwapFields.forEach(f => {
            if (f in newArr[idx]) {
                [newArr[idx][f], newArr[newIdx][f]] =
                    [newArr[newIdx][f], newArr[idx][f]];
            }
        });

        return newArr.sort((a, b) => a[field] - b[field]);
    };

    // Di chuyển cấp 1 (menu)
    const HandleMoveMenu = (index1, direction) => {
        setData(prev => prev.map(product => {
            const sorted = [...product.menu].sort((a, b) => a.local - b.local);
            const newIdx = direction === "up" ? index1 - 1 : index1 + 1;
            if (newIdx < 0 || newIdx >= sorted.length) return product;
            return { ...product, menu: swapByField(sorted, index1, newIdx, "local", ["iCap1"]) };
        }));
    };

    // Di chuyển cấp 2 (menu1)
    const HandleMoveMenu1 = (iCap1, index1, direction) => {
        setData(prev => prev.map(product => ({
            ...product,
            menu: product.menu.map(item1 => {
                if (item1.iCap1 !== iCap1) return item1;
                const sorted = [...item1.menu1].sort((a, b) => a.location - b.location);
                const newIdx = direction === "up" ? index1 - 1 : index1 + 1;
                if (newIdx < 0 || newIdx >= sorted.length) return item1;
                return { ...item1, menu1: swapByField(sorted, index1, newIdx, "location", ["icap2"]) };
            })
        })));
    };

    // Di chuyển cấp 3 (menu2)
    const HandleMoveMenu2 = (iCap1, icap2, index2, direction) => {
        setData(prev => prev.map(product => ({
            ...product,
            menu: product.menu.map(item1 => {
                if (item1.iCap1 !== iCap1) return item1;
                return {
                    ...item1,
                    menu1: item1.menu1.map(item2 => {
                        if (item2.icap2 !== icap2) return item2;
                        const sorted = [...item2.menu2].sort(
                            (a, b) => a.locationChildrenMenu - b.locationChildrenMenu
                        );
                        const newIdx = direction === "up" ? index2 - 1 : index2 + 1;
                        if (newIdx < 0 || newIdx >= sorted.length) return item2;
                        return {
                            ...item2,
                            menu2: swapByField(sorted, index2, newIdx, "locationChildrenMenu", ["icap3"])
                        };
                    })
                };
            })
        })));
    };

    // ================= DELETE =================
    const HandleDeleteMenu = (index1) => {
        setData(prev => prev.map(product => ({
            ...product,
            menu: product.menu
                .filter((_, i) => i !== index1)
                .map((item, i) => ({ ...item, iCap1: i, local: i + 1 }))
        })));
        setDataEdit(null);
    };

    const HandleDeleteMenu1 = (iCap1, index2) => {
        setData(prev => prev.map(product => ({
            ...product,
            menu: product.menu.map(item1 => {
                if (item1.iCap1 !== iCap1) return item1;
                const menu1 = item1.menu1
                    .filter((_, i) => i !== index2)
                    .map((item, i) => ({ ...item, icap2: i, location: i + 1 }));
                return { ...item1, menu1 };
            })
        })));
        setDataEdit(null);
    };

    const HandleDeleteMenu2 = (iCap1, icap2, index3) => {
        setData(prev => prev.map(product => ({
            ...product,
            menu: product.menu.map(item1 => {
                if (item1.iCap1 !== iCap1) return item1;
                return {
                    ...item1,
                    menu1: item1.menu1.map(item2 => {
                        if (item2.icap2 !== icap2) return item2;
                        const menu2 = item2.menu2
                            .filter((_, i) => i !== index3)
                            .map((item, i) => ({ ...item, icap3: i, locationChildrenMenu: i + 1 }));
                        return { ...item2, menu2 };
                    })
                };
            })
        })));
        setDataEdit(null);
    };

    // ================= SUBMIT =================
    const HandleSubmit = async () => {
        try {
            const product = data[0];

            const cleanMenu = product.menu.map(({ status, iCap1, _id, ...m1 }) => ({
                ...(_id ? { _id } : {}),
                title: m1.title,
                titleEN: m1.titleEN,
                local: m1.local,
                kindOf: m1.kindOf,
                menu1: m1.menu1.map(({ status, icap2, _id: id1, ...m2 }) => ({
                    ...(id1 ? { _id: id1 } : {}),
                    titleMenu: m2.titleMenu,
                    titleMenuEN: m2.titleMenuEN,
                    typeof: (m2.menu2 && m2.menu2.length > 0) ? "" : m2.typeof,
                    location: m2.location,
                    menu2: (m2.menu2 || []).map(({ icap3, _id: id2, ...m3 }) => ({
                        ...(id2 ? { _id: id2 } : {}),
                        titleChildrenMenu: m3.titleChildrenMenu,
                        titleChildrenMenuEN: m3.titleChildrenMenuEN,
                        typeofChildrenMenu: m3.typeofChildrenMenu,
                        locationChildrenMenu: m3.locationChildrenMenu
                    }))
                }))
            }));

            const formData = new FormData();
            formData.append("menu", JSON.stringify(cleanMenu));

            // ===== LOGO =====
            if (product.logoFile) {
                formData.append("logo", product.logoFile);
            }

            // ===== BANNER cấp document =====
            const sortedBanners = [...(product.banner || [])]
                .sort((a, b) => a.locationBanner - b.locationBanner);

            const bannerMeta = sortedBanners.map((b) =>
                b.file
                    ? { type: "new", locationBanner: b.locationBanner }
                    : { type: "existing", img: b.img, locationBanner: b.locationBanner }
            );

            formData.append("bannerMeta", JSON.stringify(bannerMeta));

            sortedBanners
                .filter((b) => b.file)
                .forEach((b) => formData.append("banner", b.file));

            // ===== BANNER TOP PIC (cấp document, nhóm theo typeofTopPic) =====
            const bannerTopPicFiles = [];

            const sortedTopPicGroups = (product.bannerTopPic || []).map(group => ({
                typeofTopPic: group.typeofTopPic,
                banner: [...(group.banner || [])].sort((a, b) => a.locationBanner - b.locationBanner)
            }));

            const bannerTopPicMeta = sortedTopPicGroups.map(group => ({
                typeofTopPic: group.typeofTopPic,
                banner: group.banner.map(b => {
                    if (b.file) bannerTopPicFiles.push(b.file);
                    return b.file
                        ? { type: "new", locationBanner: b.locationBanner }
                        : { type: "existing", img: b.img, locationBanner: b.locationBanner };
                })
            }));

            formData.append("bannerTopPicMeta", JSON.stringify(bannerTopPicMeta));

            // Bắt buộc append đúng thứ tự đã push ở trên (bannerTopPicFiles)
            bannerTopPicFiles.forEach((file) => formData.append("bannerTopPic", file));

            const result = await Post(`/menu/update/${product._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (result.status === 200) {
                toast.success("Thành công");
            }
        } catch (error) {
            console.log(error);
            toast.error("Có lỗi xảy ra");
        }
    };

    const HandleUpdateData = (newValue) => {
        const { _path, ...fields } = newValue;

        setData(prev => {
            const clone = structuredClone(prev);
            const product = clone[0];
            if (!_path) return clone;

            const { iCap1, icap2, icap3 } = _path;

            if (icap3 !== undefined) {
                const item2 = product.menu[iCap1]?.menu1[icap2];
                if (item2?.menu2[icap3]) Object.assign(item2.menu2[icap3], fields);
            } else if (icap2 !== undefined) {
                const item1 = product.menu[iCap1];
                if (item1?.menu1[icap2]) Object.assign(item1.menu1[icap2], fields);
            } else if (iCap1 !== undefined) {
                if (product.menu[iCap1]) Object.assign(product.menu[iCap1], fields);
            }

            return clone;
        });

        setDataEdit(newValue);
    };

    // ================= LOGO =================
    const HandleClickLogo = (index) => {
        setEditingLogoIndex(index);
        logoInputRef.current?.click();
    };

    const HandleChangeLogo = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Vui lòng chọn file ảnh");
            e.target.value = "";
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Ảnh không được vượt quá 5MB");
            e.target.value = "";
            return;
        }

        const previewUrl = URL.createObjectURL(file);

        setData(prev => prev.map((product, i) =>
            i === editingLogoIndex
                ? { ...product, logo: previewUrl, logoFile: file }
                : product
        ));

        e.target.value = "";
    };

    // ================= BANNER (cấp document) =================
    const HandleClickAddBanner = (index) => {
        setEditingBannerIndex(index);
        bannerInputRef.current?.click();
    };

    const HandleChangeBannerFiles = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const invalid = files.find(f => !f.type.startsWith("image/"));
        if (invalid) {
            toast.error("Vui lòng chỉ chọn file ảnh");
            e.target.value = "";
            return;
        }

        const tooBig = files.find(f => f.size > 5 * 1024 * 1024);
        if (tooBig) {
            toast.error("Mỗi ảnh không được vượt quá 5MB");
            e.target.value = "";
            return;
        }

        setData(prev => prev.map((product, i) => {
            if (i !== editingBannerIndex) return product;

            const startLocation = product.banner.length;
            const newBanners = files.map((file, idx) => ({
                img: URL.createObjectURL(file),
                locationBanner: startLocation + idx + 1,
                file
            }));

            return { ...product, banner: [...product.banner, ...newBanners] };
        }));

        e.target.value = "";
    };

    const HandleRemoveBanner = (productIndex, bannerIndex) => {
        setData(prev => prev.map((product, i) => {
            if (i !== productIndex) return product;
            const newBanner = product.banner
                .filter((_, idx) => idx !== bannerIndex)
                .map((b, idx) => ({ ...b, locationBanner: idx + 1 }));
            return { ...product, banner: newBanner };
        }));
    };

    const HandleMoveBanner = (productIndex, bannerIndex, direction) => {
        setData(prev => prev.map((product, i) => {
            if (i !== productIndex) return product;
            const sorted = [...product.banner].sort((a, b) => a.locationBanner - b.locationBanner);
            const newIdx = direction === "up" ? bannerIndex - 1 : bannerIndex + 1;
            if (newIdx < 0 || newIdx >= sorted.length) return product;
            return { ...product, banner: swapByField(sorted, bannerIndex, newIdx, "locationBanner") };
        }));
    };

    // ================= BANNER TOP PIC (cấp document, nhóm theo typeofTopPic) =================
    const HandleAddBannerTopGroup = () => {
        setData(prev => prev.map(product => ({
            ...product,
            bannerTopPic: [
                ...(product.bannerTopPic || []),
                {
                    typeofTopPic: `Loại banner ${(product.bannerTopPic || []).length + 1}`,
                    banner: []
                }
            ]
        })));
    };

    const HandleChangeTopPicGroupName = (groupIndex, value) => {
        setData(prev => prev.map(product => ({
            ...product,
            bannerTopPic: (product.bannerTopPic || []).map((g, i) =>
                i === groupIndex ? { ...g, typeofTopPic: value } : g
            )
        })));
    };

    const HandleDeleteBannerTopGroup = (groupIndex) => {
        setData(prev => prev.map(product => ({
            ...product,
            bannerTopPic: (product.bannerTopPic || []).filter((_, i) => i !== groupIndex)
        })));
    };

    const HandleClickAddBannerTop = (groupIndex) => {
        setEditingTopPicGroupIndex(groupIndex);
        bannerTopInputRef.current?.click();
    };

    const HandleChangeBannerTopFiles = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const invalid = files.find(f => !f.type.startsWith("image/"));
        if (invalid) {
            toast.error("Vui lòng chỉ chọn file ảnh");
            e.target.value = "";
            return;
        }

        const tooBig = files.find(f => f.size > 5 * 1024 * 1024);
        if (tooBig) {
            toast.error("Mỗi ảnh không được vượt quá 5MB");
            e.target.value = "";
            return;
        }

        setData(prev => prev.map(product => {
            const groups = [...(product.bannerTopPic || [])];
            const group = groups[editingTopPicGroupIndex];
            if (!group) return product;

            const start = group.banner?.length || 0;
            const newBanners = files.map((file, idx) => ({
                img: URL.createObjectURL(file),
                locationBanner: start + idx + 1,
                file
            }));

            groups[editingTopPicGroupIndex] = {
                ...group,
                banner: [...(group.banner || []), ...newBanners]
            };

            return { ...product, bannerTopPic: groups };
        }));

        e.target.value = "";
    };

    const HandleRemoveBannerTop = (groupIndex, bannerIndex) => {
        setData(prev => prev.map(product => {
            const groups = [...(product.bannerTopPic || [])];
            const group = groups[groupIndex];
            if (!group) return product;

            const newBanner = (group.banner || [])
                .filter((_, i) => i !== bannerIndex)
                .map((b, i) => ({ ...b, locationBanner: i + 1 }));

            groups[groupIndex] = { ...group, banner: newBanner };
            return { ...product, bannerTopPic: groups };
        }));
    };

    const HandleMoveBannerTop = (groupIndex, bannerIndex, direction) => {
        setData(prev => prev.map(product => {
            const groups = [...(product.bannerTopPic || [])];
            const group = groups[groupIndex];
            if (!group) return product;

            const sorted = [...(group.banner || [])].sort((a, b) => a.locationBanner - b.locationBanner);
            const newIdx = direction === "up" ? bannerIndex - 1 : bannerIndex + 1;
            if (newIdx < 0 || newIdx >= sorted.length) return product;

            const swapped = swapByField(sorted, bannerIndex, newIdx, "locationBanner");
            groups[groupIndex] = { ...group, banner: swapped };
            return { ...product, bannerTopPic: groups };
        }));
    };

    return (
        <div>
            <Toaster position="top-right" />

            {/* Input file ẩn cho logo */}
            <input
                type="file"
                accept="image/*"
                ref={logoInputRef}
                onChange={HandleChangeLogo}
                style={{ display: "none" }}
            />
            {/* Input file ẩn cho banner cấp document */}
            <input
                type="file"
                accept="image/*"
                multiple
                ref={bannerInputRef}
                onChange={HandleChangeBannerFiles}
                style={{ display: "none" }}
            />

            {
                data?.map((product, index) => {
                    return (
                        <div key={index}>
                            <div className={cx('category')}>
                                <div className={cx('boxLogo')}>
                                    <div
                                        className={cx('logoWrap')}
                                        onClick={() => HandleClickLogo(index)}
                                        style={{ position: "relative", cursor: "pointer" }}
                                    >
                                        <img className={cx('logo')} src={product.logo} alt="" />
                                        <div className={cx('logoOverlay')}>
                                            <CIcon icon={cilPencil} />
                                            <span>Đổi logo</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={cx("nameVN")}>KHOA CÔNG NGHỆ THÔNG TIN</p>
                                        <p className={cx('nameEl')}>Faculty of Information Technology</p>
                                    </div>
                                </div>

                                <div className={cx('listCategory')}>
                                    <div className={cx('menu')}>
                                        {
                                            product?.menu?.map((item, mIndex) => {
                                                return (
                                                    <div key={mIndex} className={cx('boxCategoryBottom')}>
                                                        <p className={cx('title')}>{item.title}</p>
                                                        <svg className={cx('iconDown')} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12">
                                                            <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                                                        </svg>
                                                        <div className={cx('categorySmall')}>
                                                            {
                                                                item.menu1.map((item1, index1) => (
                                                                    <div key={index1} className={cx('categoryChildren1')}>
                                                                        <p>{item1.titleMenu}</p>
                                                                        <div>
                                                                            {item1?.menu2?.map((item2, index2) => (
                                                                                <div style={{ borderRadius: 5 }} key={index2}>
                                                                                    <p>{item2.titleChildrenMenu}</p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Preview banner (slideshow ngoài trang chủ) */}
                            <div className={cx("banners")}>
                                <Banner url={product?.banner} />
                            </div>
                        </div>
                    );
                })
            }

            <div className={cx("editorWrap")}>
                <div className={cx("nav")}>
                    <CNav variant="tabs" className={cx("tabs")}>
                        <CNavItem>
                            <CTabLink className={cx(activeTab === "menu" ? "active" : "noneActive")} onClick={() => setActiveTab("menu")}>
                                <CIcon icon={cilList} className="me-2" />
                                Menu
                            </CTabLink>
                        </CNavItem>
                        <CNavItem>
                            <CTabLink className={cx(activeTab === "banner" ? "active" : "noneActive")} onClick={() => setActiveTab("banner")}>
                                <CIcon icon={cilImage} className="me-2" />
                                Banner
                            </CTabLink>
                        </CNavItem>
                        <CNavItem>
                            <CTabLink className={cx(activeTab === "bannerTopPic" ? "active" : "noneActive")} onClick={() => setActiveTab("bannerTopPic")}>
                                <CIcon icon={cilImage} className="me-2" />
                                Banner Top
                            </CTabLink>
                        </CNavItem>
                    </CNav>
                    <CButton className={cx("btnSave")} color="Primary" onClick={HandleSubmit}>
                        <CIcon icon={cilSave} className="me-2" />
                        Lưu
                    </CButton>
                </div>

                <div className={cx("editFormMenu")}>
                    {activeTab === "menu" && (
                        <>
                            <div className={cx("edit")}>
                                {
                                    data?.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                {
                                                    item?.menu?.map((item1, index1) => {
                                                        return (
                                                            <div key={index1}>
                                                                <div>
                                                                    <div className={cx("lblTitleEdit")}>
                                                                        <div className={cx('boxMenu')} onClick={() => toggleMenu("cap1", item1.iCap1, null, null)}>
                                                                            <CFormLabel style={{ margin: 0 }}>{item1.title}</CFormLabel>
                                                                            <svg className={cx('iconDown', { open: item1.status })} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12">
                                                                                <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                                                                            </svg>
                                                                        </div>

                                                                        <div className={cx('setting')}>
                                                                            <div style={{ display: "flex", gap: 5 }}>
                                                                                <div className={cx('boxIcon')} onClick={() => HandleMoveMenu(index1, "up")}>
                                                                                    <CIcon className={cx('iconCilArrowTop')} icon={cilArrowTop} />
                                                                                </div>
                                                                                <div className={cx('boxIcon')} onClick={() => HandleMoveMenu(index1, "down")}>
                                                                                    <CIcon className={cx('iconCilArrowTop')} icon={cilArrowBottom} />
                                                                                </div>
                                                                                <div onClick={() => HandleDeleteMenu(index1)}>
                                                                                    <CIcon className={cx('iconTrash')} icon={cilTrash} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        style={{
                                                                            height: item1.status ? "auto" : "0",
                                                                            overflow: "hidden",
                                                                            transition: "height 0.3s ease"
                                                                        }}
                                                                        className={cx('bordermenu')}
                                                                    >
                                                                        {
                                                                            item1?.menu1?.map((item2, index2) => {
                                                                                return (
                                                                                    <div key={index2} style={{ marginLeft: 10, padding: "10px 0" }}>
                                                                                        <div className={cx("lblTitleEdit1")}>
                                                                                            <div className={cx('boxMenu')} onClick={() => toggleMenu("cap2", item1.iCap1, item2.icap2, null)}>
                                                                                                <CFormLabel style={{ margin: 0 }}>{item2.titleMenu}</CFormLabel>
                                                                                                <svg className={cx('iconDown', { open: item2?.status })} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12">
                                                                                                    <path d="M2 4 L6 8 L10 4 Z" fill="currentColor" />
                                                                                                </svg>
                                                                                            </div>

                                                                                            <div className={cx('setting')}>
                                                                                                <div style={{ display: "flex", gap: 5 }}>
                                                                                                    <div className={cx('boxIcon')} onClick={() => HandleMoveMenu1(item1.iCap1, index2, "up")}>
                                                                                                        <CIcon className={cx('iconCilArrowTop')} icon={cilArrowTop} />
                                                                                                    </div>
                                                                                                    <div className={cx('boxIcon')} onClick={() => HandleMoveMenu1(item1.iCap1, index2, "down")}>
                                                                                                        <CIcon className={cx('iconCilArrowTop')} icon={cilArrowBottom} />
                                                                                                    </div>
                                                                                                    <div onClick={() => HandleDeleteMenu1(item1.iCap1, index2)}>
                                                                                                        <CIcon className={cx('iconTrash')} icon={cilTrash} />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className={cx("menuCollapse")}>
                                                                                            <div
                                                                                                className={cx('bordermenu')}
                                                                                                style={{
                                                                                                    padding: item2?.status ? "10px" : "0",
                                                                                                    display: "flex",
                                                                                                    flexDirection: "column",
                                                                                                    gap: "10px",
                                                                                                    height: item2?.status ? "auto" : "0",
                                                                                                    overflow: "hidden",
                                                                                                    transition: "height 0.3s ease"
                                                                                                }}
                                                                                            >
                                                                                                {
                                                                                                    item2?.menu2?.map((item3, index3) => {
                                                                                                        return (
                                                                                                            <div key={index3} style={{ marginLeft: 10 }} className={cx("lblTitleEdit2Wrap")}>
                                                                                                                <div
                                                                                                                    className={cx("lblTitleEdit2")}
                                                                                                                    onClick={() => toggleMenu("", item1.iCap1, item2.icap2, index3)}
                                                                                                                >
                                                                                                                    <CFormLabel style={{ margin: 0 }}>{item3.titleChildrenMenu}</CFormLabel>
                                                                                                                </div>

                                                                                                                <div className={cx('setting')}>
                                                                                                                    <div style={{ display: "flex", gap: 5 }}>
                                                                                                                        <div
                                                                                                                            className={cx('boxIcon')}
                                                                                                                            onClick={(e) => { e.stopPropagation(); HandleMoveMenu2(item1.iCap1, item2.icap2, index3, "up"); }}
                                                                                                                        >
                                                                                                                            <CIcon className={cx('iconCilArrowTop')} icon={cilArrowTop} />
                                                                                                                        </div>
                                                                                                                        <div
                                                                                                                            className={cx('boxIcon')}
                                                                                                                            onClick={(e) => { e.stopPropagation(); HandleMoveMenu2(item1.iCap1, item2.icap2, index3, "down"); }}
                                                                                                                        >
                                                                                                                            <CIcon className={cx('iconCilArrowTop')} icon={cilArrowBottom} />
                                                                                                                        </div>
                                                                                                                        <div
                                                                                                                            onClick={(e) => { e.stopPropagation(); HandleDeleteMenu2(item1.iCap1, item2.icap2, index3); }}
                                                                                                                        >
                                                                                                                            <CIcon className={cx('iconTrash')} icon={cilTrash} />
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        );
                                                                                                    })
                                                                                                }
                                                                                                <CButton onClick={() => HandleAddDanhMucCap2(item1.iCap1, item2.icap2)} style={{ marginLeft: 10 }} className={cx('btnAdd')} type="button">
                                                                                                    <CIcon style={{ margin: "0px" }} icon={cilPlus} />
                                                                                                </CButton>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })
                                                                        }

                                                                        <CButton onClick={() => HandleAddDanhMucCap1(item1.iCap1)} style={{ marginLeft: 10 }} className={cx('btnAdd')} type="button">
                                                                            <CIcon style={{ margin: "0px" }} icon={cilPlus} />
                                                                        </CButton>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        );
                                    })
                                }
                                <CButton onClick={() => HandleAddDanhMucParent()} className={cx('btnAdd')} type="button">
                                    <CIcon style={{ margin: "0px" }} icon={cilPlus} />
                                </CButton>
                            </div>

                            <div className={cx("formEdit")}>
                                {
                                    dataEdit == null
                                        ? <div className={cx("emptyDisplay")}>
                                            <CIcon icon={cilSettings} style={{ width: 48, height: 48, color: "#ccc" }} />
                                            <p style={{ color: "#aaa", marginTop: 12, fontSize: 14 }}>
                                                Chọn một mục bên trái để chỉnh sửa
                                            </p>
                                        </div>
                                        : <FormEdit
                                            dataEdit={dataEdit}
                                            onChange={HandleUpdateData}
                                        />
                                }
                            </div>
                        </>
                    )}

                    {activeTab === "banner" && (
                        <div className={cx("bannerEditWrap")} style={{ gridColumn: "1 / -1", padding: 10 }}>
                            {
                                data?.map((product, index) => (
                                    <div key={index} style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                                        {
                                            [...product.banner]
                                                .sort((a, b) => a.locationBanner - b.locationBanner)
                                                .map((b, bIndex) => (
                                                    <div key={bIndex} className={cx("bannerItem")}>
                                                        <img src={b.img} alt="" className={cx("bannerPreview")} />
                                                        <div className={cx("bannerControls")}>
                                                            <div
                                                                className={cx('boxIcon')}
                                                                onClick={() => HandleMoveBanner(index, bIndex, "up")}
                                                            >
                                                                <CIcon className={cx('iconCilArrowTop')} icon={cilArrowTop} />
                                                            </div>
                                                            <div
                                                                className={cx('boxIcon')}
                                                                onClick={() => HandleMoveBanner(index, bIndex, "down")}
                                                            >
                                                                <CIcon className={cx('iconCilArrowTop')} icon={cilArrowBottom} />
                                                            </div>
                                                            <div onClick={() => HandleRemoveBanner(index, bIndex)}>
                                                                <CIcon className={cx('iconTrash')} icon={cilTrash} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                        }

                                        <div
                                            className={cx("bannerAddBox")}
                                            onClick={() => HandleClickAddBanner(index)}
                                        >
                                            <CIcon icon={cilPlus} width={24} />
                                            <span>Thêm banner</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )}

                    {activeTab === "bannerTopPic" && (
                        <div className={cx("bannerEditWrap")} style={{ gridColumn: "1 / -1", padding: 10 }}>
                            {/* Input file ẩn cho banner top pic */}
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                hidden
                                ref={bannerTopInputRef}
                                onChange={HandleChangeBannerTopFiles}
                            />

                            {
                                data?.map((product, pIndex) => (
                                    <div key={pIndex}>
                                        {
                                            (product.bannerTopPic || []).map((group, groupIndex) => (
                                                <div key={groupIndex} style={{ marginBottom: 24 }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                                        <CFormLabel style={{ margin: 0, fontWeight: 600 }}>Loại:</CFormLabel>
                                                        <input
                                                            value={group.typeofTopPic || ""}

                                                            placeholder="Tên loại banner"
                                                            style={{ padding: "4px 8px" }}
                                                        />
                                                        <select
                                                            style={{ padding: 7 }}
                                                            value={group.typeofTopPic || ""}
                                                            onChange={(e) => HandleChangeTopPicGroupName(groupIndex, e.target.value)}
                                                        >
                                                            <option value="">Chọn loại thông tin</option>
                                                            {
                                                                data[0]?.menu.flatMap(item => [
                                                                    ...item.menu1.map(menu => ({
                                                                        title: menu.titleMenu,
                                                                        typeof: menu.typeof,
                                                                        kindOf: item.kindOf
                                                                    })),
                                                                    ...item.menu1.flatMap(menu =>
                                                                        menu.menu2.map(child => ({
                                                                            title: child.titleChildrenMenu,
                                                                            typeof: child.typeofChildrenMenu,
                                                                            kindOf: item.kindOf
                                                                        }))
                                                                    )
                                                                ]).map((item, index) => {
                                                                    return (
                                                                        item?.typeof !== "" && item?.kindOf === "tin_tuc" && <option key={index} value={item.typeof}>{item.title}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                        <div onClick={() => HandleDeleteBannerTopGroup(groupIndex)}>
                                                            <CIcon className={cx('iconTrash')} icon={cilTrash} />
                                                        </div>
                                                    </div>

                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                                                        {
                                                            [...(group.banner || [])]
                                                                .sort((a, b) => a.locationBanner - b.locationBanner)
                                                                .map((b, bIndex) => (
                                                                    <div key={bIndex} className={cx("bannerItem")}>
                                                                        <img src={b.img} alt="" className={cx("bannerPreview")} />
                                                                        <div className={cx("bannerControls")}>
                                                                            <div
                                                                                className={cx('boxIcon')}
                                                                                onClick={() => HandleMoveBannerTop(groupIndex, bIndex, "up")}
                                                                            >
                                                                                <CIcon icon={cilArrowTop} />
                                                                            </div>
                                                                            <div
                                                                                className={cx('boxIcon')}
                                                                                onClick={() => HandleMoveBannerTop(groupIndex, bIndex, "down")}
                                                                            >
                                                                                <CIcon icon={cilArrowBottom} />
                                                                            </div>
                                                                            <div onClick={() => HandleRemoveBannerTop(groupIndex, bIndex)}>
                                                                                <CIcon icon={cilTrash} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                        }

                                                        <div
                                                            className={cx("bannerAddBox")}
                                                            onClick={() => HandleClickAddBannerTop(groupIndex)}
                                                        >
                                                            <CIcon icon={cilPlus} width={24} />
                                                            <span>Thêm banner</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                        <CButton onClick={HandleAddBannerTopGroup} className={cx('btnAdd')} type="button">
                                            <CIcon icon={cilPlus} className="me-2" />
                                            Thêm loại banner
                                        </CButton>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};