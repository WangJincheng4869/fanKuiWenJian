class StringUtils {
  /**
   * 将字符串转换为数字
   * @param str 要转换的字符串
   * @param defaultValue 默认值，如果不填则是 0
   * @returns 转换后的数字，如果转换失败会返回 0
   */
  toInt(str?: string, defaultValue = 0): number {
    if (typeof str !== 'string') {
      return defaultValue;
    }
    const value = parseInt(str, 10);
    if (isNaN(value)) {
      return defaultValue;
    }
    return value;
  }

  /**
   * 将字符串转换为 Boolean 值
   * @param str 要转换的字符串
   * @returns 字符串为 'true' 或 '1' 的时候返回 true，其余均返回 false
   */
  toBoolean(str?: string): boolean {
    if (typeof str !== 'string') {
      return false;
    }
    const strLowerCase = str.toLowerCase();
    return strLowerCase === '1' || strLowerCase === 'true';
  }

  /**
   * 将字符串中的非数字字符删除
   * @param str 字符串
   * @returns 仅保留数字
   */
  rmNonNumber(str?: string) {
    if (!str) {
      return '';
    }
    return str.replace(/[^\d]/g, '');
  }

  /**
   * 删除字符串开头的 0
   * @param str 要修剪得字符串
   * @returns 修建后的字符串
   */
  trimStartZero(str = '') {
    return str.replace(/^0+/g, '');
  }

  /**
   * 将字符串中的非数字字符删除，并删除字符串开头的 0
   * @param str 要修剪的字符串
   * @returns
   */
  rmNonNumberTrimStartZero(str = '') {
    return stringUtils.rmNonNumber(stringUtils.trimStartZero(str));
  }

  /**
   * 仅删除位于源字符串开头的子字符串，否则返回源字符串。
   *
   * `null` 源字符串将返回 `null` 。空 ("") 源字符串将返回空字符串。 `null` 搜索字符串将返回源字符串。
   *
   * ```ts
   * stringUtils.removeStart(null, *)      = null
   * stringUtils.removeStart("", *)        = ""
   * stringUtils.removeStart(*, null)      = *
   * stringUtils.removeStart("www.domain.com", "www.")   = "domain.com"
   * stringUtils.removeStart("domain.com", "www.")       = "domain.com"
   * stringUtils.removeStart("www.domain.com", "domain") = "www.domain.com"
   * stringUtils.removeStart("abc", "")    = "abc"
   * ```
   *
   * @param str 要搜索的源字符串，可以为 `null`
   * @param remove 要搜索和删除的字符串，可能为空
   * @returns 如果找到则删除该字符串的子字符串，如果为 `null` 则为 `null` 字符串输入
   */
  removeStart(str: string, remove: string) {
    if (!str || !remove) {
      return str;
    }
    if (str.startsWith(remove)) {
      return str.substring(remove.length);
    }
    return str;
  }

  /**
   * 仅当子字符串位于源字符串末尾时才删除它，否则返回源字符串。
   *
   * `null` 源字符串将返回 `null` 。空 ("") 源字符串将返回空字符串。 `null` 搜索字符串将返回源字符串。
   *
   * ```ts
   * stringUtils.removeEnd(null, *)      = null
   * stringUtils.removeEnd("", *)        = ""
   * stringUtils.removeEnd(*, null)      = *
   * stringUtils.removeEnd("www.domain.com", ".com.")  = "www.domain.com"
   * stringUtils.removeEnd("www.domain.com", ".com")   = "www.domain"
   * stringUtils.removeEnd("www.domain.com", "domain") = "www.domain.com"
   * stringUtils.removeEnd("abc", "")    = "abc"
   * ```
   *
   * @param str 要搜索的源字符串，可以为 `null`
   * @param remove 要搜索和删除的字符串，可能为空
   * @returns 如果找到则删除该字符串的子字符串，如果为 `null` 则为 `null` 字符串输入
   */
  removeEnd(str: string, remove: string) {
    if (!str || !remove) {
      return str;
    }
    if (str.endsWith(remove)) {
      return str.substring(0, str.length - remove.length);
    }
    return str;
  }

  /**
   * 如果字符串尚未以任何后缀结尾，则将后缀附加到字符串的末尾。
   *
   * ```ts
   * StringUtils. appendIfMissing(null, null) = null
   * StringUtils. appendIfMissing("abc", null) = "abc"
   * StringUtils. appendIfMissing("", "xyz") = "xyz"
   * StringUtils. appendIfMissing("123", "xyz") = "123xyz"
   * StringUtils. appendIfMissing("123xyz", "xyz") = "123xyz"
   * StringUtils. appendIfMissing("abcXYZ", "xyz") = "abcXYZxyz"
   * ```
   * @param str
   * @param suffix
   * @returns
   */
  appendIfMissing(str: string, suffix: string) {
    if (!str || !suffix) {
      return '';
    }
    if (!str.endsWith(suffix)) {
      return str + suffix;
    }
    return str;
  }

  /**
   * 如果字符串尚未以任何前缀开头，则将前缀添加到字符串的开头。
   *
   * ```ts
   * StringUtils. prependIfMissing(null, null) = null
   * StringUtils. prependIfMissing("abc", null) = "abc"
   * StringUtils. prependIfMissing("", "xyz") = "xyz"
   * StringUtils. prependIfMissing("123", "xyz") = "xyz123"
   * StringUtils. prependIfMissing("xyz123", "xyz") = "xyz123"
   * StringUtils. prependIfMissing("XYZabc", "xyz") = "xyzXYZabc"
   * ```
   * @param str 字符串
   * @param prefix 添加在字符串开头的前缀
   * @returns
   */
  prependIfMissing(str: string, prefix: string) {
    if (!str || !prefix) {
      return '';
    }
    if (!str.startsWith(prefix)) {
      return prefix + str;
    }
    return str;
  }

}

export const stringUtils = new StringUtils();
