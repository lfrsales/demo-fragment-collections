package com.liferay.fragment.collection.contributor.billboard;

import com.liferay.fragment.contributor.BaseFragmentCollectionContributor;
import com.liferay.fragment.contributor.FragmentCollectionContributor;

import javax.servlet.ServletContext;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

/**
 * @author evanthibodeau
 */
@Component(service = FragmentCollectionContributor.class)
public class BillboardFragmentCollectionContributor extends BaseFragmentCollectionContributor {

	@Override
	public String getFragmentCollectionKey() {
		return "billboard-fragments";
	}

	@Override
	public ServletContext getServletContext() {
		return _servletContext;
	}

	@Reference(
		target = "(osgi.web.symbolicname=com.liferay.fragment.collection.contributor.billboard)"
	)


	private ServletContext _servletContext;

}