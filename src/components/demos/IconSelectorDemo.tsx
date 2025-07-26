import React, { useState, useEffect} from 'react';
import {IconSelector, SvgIcon} from "@/components";

// Demo usage component
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IconSelectorDemoProps {}

const IconSelectorDemo: React.FC<IconSelectorDemoProps> = () => {
  const [selectedIcon, setSelectedIcon] = useState<SvgIcon | null>(null);
  const [icons, setIcons] = useState<SvgIcon[]>([]);

  useEffect(() => {
    // Find all SVG symbol libraries on the page
    const discoverIcons = (): SvgIcon[] => {
      const svgElements = document.querySelectorAll('svg');
      const discoveredIcons: SvgIcon[] = [];

      svgElements.forEach((svg, svgIndex) => {
        // Look for symbol elements within SVG
        const symbols = svg.querySelectorAll('symbol');
        symbols.forEach((symbol) => {
          const id = symbol.getAttribute('id');
          if (id) {
            const viewBox = symbol.getAttribute('viewBox') || svg.getAttribute('viewBox') || '0 0 24 24';

            discoveredIcons.push({
              id: id,
              viewBox: viewBox,
              innerHTML: symbol.innerHTML,
              source: `svg-${svgIndex}`,
              element: symbol
            });
          }
        });

        // Also look for direct icon definitions
        const groups = svg.querySelectorAll('g[id], path[id], circle[id], rect[id], polygon[id]');
        groups.forEach((element) => {
          const id = element.getAttribute('id');
          if (id && !id.includes('clip') && !id.includes('mask')) {
            const viewBox = svg.getAttribute('viewBox') || '0 0 24 24';

            discoveredIcons.push({
              id: id,
              viewBox: viewBox,
              innerHTML: element.outerHTML,
              source: `svg-${svgIndex}`,
              element: element
            });
          }
        });
      });

      // Demo icons if none found
      if (discoveredIcons.length === 0) {
        const demoIcons: SvgIcon[] = [
          {
            id: 'home',
            viewBox: '0 0 24 24',
            innerHTML: '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
            source: 'demo',
            isDemo: true
          },
          {
            id: 'user',
            viewBox: '0 0 24 24',
            innerHTML: '<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
            source: 'demo',
            isDemo: true
          },
          {
            id: 'star',
            viewBox: '0 0 24 24',
            innerHTML: '<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
            source: 'demo',
            isDemo: true
          },
          {
            id: 'settings',
            viewBox: '0 0 24 24',
            innerHTML: '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="2" fill="none"/>',
            source: 'demo',
            isDemo: true
          },
          {
            id: 'heart',
            viewBox: '0 0 24 24',
            innerHTML: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
            source: 'demo',
            isDemo: true
          },
          {
            id: 'mail',
            viewBox: '0 0 24 24',
            innerHTML: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" fill="none"/><polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" fill="none"/>',
            source: 'demo',
            isDemo: true
          },
          {
            id: 'bell',
            viewBox: '0 0 24 24',
            innerHTML: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
            source: 'demo',
            isDemo: true
          },
          {
            id: 'calendar',
            viewBox: '0 0 24 24',
            innerHTML: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>',
            source: 'demo',
            isDemo: true
          }
        ];
        return demoIcons;
      }

      return discoveredIcons;
    };

    const foundIcons = discoverIcons();
    setIcons(foundIcons);
  }, []);

  return (
    <div className="mx-auto p-6 space-y-4">

      <div>
        <IconSelector
          label={"Icon selector"}
          options={icons}
          value={selectedIcon}
          onChange={setSelectedIcon}
          placeholder="Select an icon..."
          help={"Select an icon to see the demo"}
        />
      </div>

      {selectedIcon && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Selected Icon:</h3>
          <div className="flex items-center gap-3">
            <svg
              viewBox={selectedIcon.viewBox}
              className="w-8 h-8 text-gray-700"
              dangerouslySetInnerHTML={{__html: selectedIcon.innerHTML}}
            />
            <div>
              <p className="font-mono text-sm">{selectedIcon.id}</p>
              <p className="text-xs text-gray-500">ViewBox: {selectedIcon.viewBox}</p>
              <p className="font-mono text-sm">{JSON.stringify(selectedIcon)}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export {IconSelectorDemo, type IconSelectorDemoProps};
